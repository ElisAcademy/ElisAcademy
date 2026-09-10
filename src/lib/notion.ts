import { Client } from "@notionhq/client";
import { getStudentType, type StudentType } from "@/lib/studentType";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Proxy Notion S3 signed image URLs through our `/api/notion-image` route.
 * Notion-hosted files use temporary signed URLs on
 * `prod-files-secure.s3.us-west-2.amazonaws.com` that expire after ~1 hour.
 * On a cold page load the Next.js Image component tries to optimise the
 * image at build/request time, but the signed URL may already be expired,
 * resulting in a broken-image icon on the first visit (works on reload
 * because the browser / CDN cache is now warm).
 *
 * This helper rewrites those S3 URLs into a local proxy URL:
 *   /api/notion-image?url=<encoded-s3-url>
 *
 * External URLs (Google Drive, Unsplash, etc.) are returned as-is.
 */
const proxyNotionImage = (url: string | null, pageId?: string, prop?: string): string | null => {
    if (!url) return null;
    if (url.includes('amazonaws.com') || url.includes('notion-static.com') || url.includes('file.notion.so')) {
        // Build a proxy URL. If we have pageId+prop, the proxy can fetch a fresh
        // S3 URL from Notion when the embedded one expires.
        let proxyUrl = `/api/notion-image?url=${encodeURIComponent(url)}`;
        if (pageId && prop) {
            proxyUrl += `&pageId=${pageId}&prop=${encodeURIComponent(prop)}`;
        }
        return proxyUrl;
    }
    return url;
};

// Helper to extract the raw URL string from a Notion property.
// Does NOT transform Google Drive URLs — callers decide how to handle them.
const getRawNotionUrl = (prop: any): string | null => {
    let url: string | null = null;
    if (!prop) return null;
    if (prop.type === 'url') url = prop.url;
    else if (prop.type === 'files' && prop.files?.length > 0) {
        const fileObj = prop.files.find((f: any) => f.file?.url || f.external?.url);
        if (fileObj) {
            url = fileObj.file?.url || fileObj.external?.url;
        }
    }
    else if (prop.type === 'rich_text' && prop.rich_text?.length > 0) {
        url = prop.rich_text[0].plain_text;
    }
    return url ? url.trim() : null;
};

// For IMAGE properties: transforms Google Drive share links into a direct
// display URL that works with Next.js Image optimisation.
// Also proxies Notion S3 signed URLs through our API route.
const getNotionUrl = (prop: any, pageId?: string, propName?: string): string | null => {
    const url = getRawNotionUrl(prop);
    if (!url) return null;

    if (url.includes('drive.google.com')) {
        let id: string | null = null;
        const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
        if (fileMatch) {
            id = fileMatch[1];
        } else {
            const idMatch = url.match(/[?&]id=([^&]+)/);
            if (idMatch) id = idMatch[1];
        }
        if (id) {
            // uc?export=view works for images; videos need /preview (handled separately)
            return `https://drive.google.com/uc?export=view&id=${id}`;
        }
    }
    return proxyNotionImage(url, pageId, propName);
};

// For VIDEO properties: returns the original URL unchanged for Google Drive/Vimeo
// so that HeroSlider can build the correct embeddable /preview URL.
// Notion direct video uploads are proxied to avoid signed URL expiration.
const getNotionVideoUrl = (prop: any, pageId?: string, propName?: string): string | null => {
    const url = getRawNotionUrl(prop);
    if (!url) return null;
    if (url.includes('drive.google.com') || url.includes('vimeo.com')) {
        return url;
    }
    return proxyNotionImage(url, pageId, propName);
};

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    date: string;
    coverImage?: string;
    description?: string;
    content?: string; // Markdown content
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_NEWS_DATABASE_ID) {
        console.warn("Notion API Key or Database ID missing. Returning mock data.");
        return [];
    }

    const databaseId = process.env.NOTION_NEWS_DATABASE_ID;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "Published",
            checkbox: {
                equals: true,
            },
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
    });

    return response.results.map((page: any) => {
        const properties = page.properties;

        // Helper to extract URL from various property types
        // Using centralized getNotionUrl to ensure proper whitespace trimming and Google Drive support

        // Try to find a custom property for the cover image
        // Checking likely capitalizations based on user request "title is coverimage"
        const customCoverUrl = getNotionUrl(properties.coverimage, page.id, 'coverimage') ||
            getNotionUrl(properties.CoverImage, page.id, 'CoverImage') ||
            getNotionUrl(properties["Cover Image"], page.id, 'Cover Image') ||
            getNotionUrl(properties["cover image"], page.id, 'cover image');

        const pageCoverUrl = proxyNotionImage(page.cover?.external?.url || page.cover?.file?.url, page.id, 'cover');

        return {
            id: page.id,
            title: properties.Title?.title[0]?.plain_text || "Untitled",
            slug: properties.Slug?.rich_text[0]?.plain_text || page.id,
            date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
            coverImage: customCoverUrl || pageCoverUrl || undefined,
            description: properties.Description?.rich_text?.map((r: any) => r.plain_text).join("") || "",
            content: properties.Content?.rich_text?.map((r: any) => r.plain_text).join("") || "",
        };
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_NEWS_DATABASE_ID) {
        // Return mock post
        return {
            id: "1",
            title: "Mock Post: Elis Academy Wins Championship",
            slug: slug,
            date: "2024-10-15",
            coverImage: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2070",
            description: "Mock description.",
            content: "## Championship Victory\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. \n\n- Point 1\n- Point 2\n\nWe are so proud of our team!"
        };
    }

    const databaseId = process.env.NOTION_NEWS_DATABASE_ID!;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            and: [
                {
                    property: "Published",
                    checkbox: { equals: true }
                },
                {
                    property: "Slug",
                    rich_text: { equals: slug }
                }
            ]
        },
    });

    if (!response.results.length) {
        return null;
    }

    const page = response.results[0];
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    const properties = (page as any).properties;

    // Helper to extract URL from various property types (re-defined here for scoping, same as above)
    // using global getNotionUrl instead

    const customCoverUrl = getNotionUrl(properties.coverimage, page.id, 'coverimage') ||
        getNotionUrl(properties.CoverImage, page.id, 'CoverImage') ||
        getNotionUrl(properties["Cover Image"], page.id, 'Cover Image') ||
        getNotionUrl(properties["cover image"], page.id, 'cover image');

    const pageCoverUrl = proxyNotionImage((page as any).cover?.external?.url || (page as any).cover?.file?.url, page.id, 'cover');

    // Content: Prioritize Page Body (Markdown blocks), fallback to "Content" property
    let finalContent = mdString.parent;
    if (!finalContent || finalContent.trim() === "") {
        const richText = properties.Content?.rich_text || properties.content?.rich_text;
        finalContent = richText?.map((r: any) => r.plain_text).join("") || "";
    }

    return {
        id: page.id,
        title: properties.Title?.title[0]?.plain_text || "Untitled",
        slug: properties.Slug?.rich_text[0]?.plain_text || page.id,
        date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
        coverImage: customCoverUrl || pageCoverUrl || undefined,
        description: properties.Description?.rich_text[0]?.plain_text || "",
        content: finalContent
    };
}

export interface HeroSlide {
    id: string;
    type: "Video" | "Image";
    videoUrl: string | null;
    imageUrl: string | null;
    title: string;
    order: number;
}

export const getHeroSlides = async (): Promise<HeroSlide[]> => {
    // It's cleaner to use a separate database for the unique schema of Hero slides
    const databaseId = process.env.NOTION_VIDEO_DATABASE_ID;

    if (!databaseId) {
        console.warn("NOTION_VIDEO_DATABASE_ID is not defined. Returning mock slides.");
        return [
            {
                id: 'mock-1',
                type: 'Video',
                videoUrl: 'https://vimeo.com/1073355184/0840bdbe46', // Fallback to the user provided one
                imageUrl: null,
                title: 'Welcome to Elis Academy',
                order: 1
            }
        ];
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
            // Removed sort by "Order" to prevent crashes if the property is missing.
            // sorts: [
            //     {
            //         property: "Order",
            //         direction: "ascending",
            //     },
            // ],
        });

        const slides: HeroSlide[] = response.results.map((page: any) => {
            const props = page.properties;

            // Debugging: Log available property names to console
            // console.log(`[HeroSlide Debug] Page ID: ${page.id}`);
            // console.log(`[HeroSlide Debug] Available Properties:`, Object.keys(props));

            // Fallbacks for missing properties
            const type = props.Type?.select?.name || "Image";

            // Helper to safely extract URL from Notion properties (supports URL and Files & Media)
            // Using global getNotionUrl

            // Get video/media URL — use the raw helper so Drive links aren't
            // converted to uc?export=view (which blocks iframe embedding).
            let videoUrl = getNotionVideoUrl(props.VideoURL, page.id, 'VideoURL');

            // Get Image URL: 
            // 1. Check for a "CoverImage" property (Files & Media) as requested by user
            // We check multiple common casing variations
            const customCoverUrl = getNotionUrl(props.CoverImage, page.id, 'CoverImage') ||
                getNotionUrl(props["Cover Image"], page.id, 'Cover Image') ||
                getNotionUrl(props.coverimage, page.id, 'coverimage') ||
                getNotionUrl(props.Image, page.id, 'Image'); // Also check generic "Image"

            let imageUrl = customCoverUrl || proxyNotionImage(page.cover?.external?.url || page.cover?.file?.url, page.id, 'cover') || null;

            if (!imageUrl && type === "Image") {
                imageUrl = videoUrl;
            }

            const title = props.Name?.title?.[0]?.plain_text || props.Title?.title?.[0]?.plain_text || "Untitled";

            return {
                id: page.id,
                type: type as "Video" | "Image",
                videoUrl: type === "Video" ? videoUrl : null,
                imageUrl: imageUrl,
                title,
                order: props.Order?.number || 0,
            };
        });

        return slides;
    } catch (error) {
        console.error("Failed to fetch hero slides from Notion:", error);
        return [];
    }
};

export interface Student {
    id: string;
    name: string;
    program: string;
    year: string;
    image: string | null;
    team: string;
    type: StudentType;
}

export interface Alumni {
    id: string;
    name: string;
    university: string;
    year: string;
    image: string;
}

export const getStudents = async (): Promise<Student[]> => {
    const databaseId = process.env.NOTION_STUDENT_DATABASE_ID;

    if (!databaseId) return [];

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
        });

        return response.results.map((page: any) => {
            const props = page.properties;

            const getName = (prop: any) => prop?.title?.[0]?.plain_text || "Untitled";
            const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || prop?.select?.name || "";
            const getNum = (prop: any) => prop?.number?.toString() || "";

            // Image extraction helper
            // Image extraction helper
            const getUrlFromProp = getNotionUrl;

            const image = getUrlFromProp(props.Image, page.id, 'Image') ||
                getUrlFromProp(props.Photo, page.id, 'Photo') ||
                getUrlFromProp(props.ImageUrl, page.id, 'ImageUrl') ||
                proxyNotionImage(page.cover?.external?.url || page.cover?.file?.url, page.id, 'cover') ||
                null; // Return null if no image found

            return {
                id: page.id,
                name: getName(props.Name),
                program: getText(props.Program) || getText(props.Sport),
                year: getNum(props.Year) || getNum(props.Class),
                image: image,
                team: getText(props.Team),
                type: getStudentType(getText(props["Student Type"])),
            };
        });
    } catch (error) {
        console.error("Failed to fetch students from Notion:", error);
        return [];
    }
};

export const getAlumni = async (): Promise<Alumni[]> => {
    const databaseId = process.env.NOTION_ALUMNI_DATABASE_ID;

    if (!databaseId) return [];

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
        });

        return response.results.map((page: any) => {
            const props = page.properties;

            const getName = (prop: any) => prop?.title?.[0]?.plain_text || "Untitled";
            const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || prop?.select?.name || "";
            const getNum = (prop: any) => prop?.number?.toString() || "";

            const getUrlFromProp = getNotionUrl;

            const image = getUrlFromProp(props.Image, page.id, 'Image') ||
                getUrlFromProp(props.Photo, page.id, 'Photo') ||
                getUrlFromProp(props.ImageUrl, page.id, 'ImageUrl') ||
                proxyNotionImage(page.cover?.external?.url || page.cover?.file?.url, page.id, 'cover') ||
                "/pics/alumni/alex.jpeg"; // Fallback image

            return {
                id: page.id,
                name: getName(props.Name),
                university: getText(props.University) || getText(props.School),
                year: getNum(props.Year) || getNum(props.Class),
                image: image
            };
        });
    } catch (error) {
        console.error("Failed to fetch alumni from Notion:", error);
        return [];
    }
};
export interface Coach {
    id: string;
    name: string;
    role: string;
    type: "Teacher" | "Coach";
    image: string | null;
}

export const getCoaches = async (): Promise<Coach[]> => {
    const databaseId = process.env.NOTION_COACH_DATABASE_ID;

    if (!databaseId) return [];

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
        });

        return response.results.map((page: any) => {
            const props = page.properties;

            const getName = (prop: any) => prop?.title?.[0]?.plain_text || "Untitled";
            const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || prop?.select?.name || "";

            // Image extraction helper
            const getUrlFromProp = getNotionUrl;

            const image = getUrlFromProp(props.Image, page.id, 'Image') ||
                getUrlFromProp(props.Photo, page.id, 'Photo') ||
                getUrlFromProp(props.ImageUrl, page.id, 'ImageUrl') ||
                proxyNotionImage(page.cover?.external?.url || page.cover?.file?.url, page.id, 'cover') ||
                null; // No default image for coaches, let frontend handle it or showing empty

            const staffType = (getText(props.Type) || getText(props["Staff Type"])).toLowerCase() === "coach"
                ? "Coach"
                : "Teacher";

            return {
                id: page.id,
                name: getName(props.Name),
                role: getText(props.Role) || getText(props.Title) || staffType,
                type: staffType,
                image: image
            };
        });
    } catch (error) {
        console.error("Failed to fetch coaches from Notion:", error);
        return [];
    }
};
// ... existing getCoaches ...

export interface University {
    id: string;
    name: string;
    domain: string;
}

export const getUniversities = async (): Promise<University[]> => {
    const databaseId = process.env.NOTION_UNI_DATABASE_ID;

    if (!databaseId) return [];

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
        });

        return response.results.map((page: any) => {
            const props = page.properties;

            const getName = (prop: any) => prop?.title?.[0]?.plain_text || "Untitled";
            const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || prop?.url || "";

            return {
                id: page.id,
                name: getName(props.Name),
                domain: getText(props.Domain) || "google.com", // Fallback to avoid empty strings if missing
            };
        });
    } catch (error) {
        console.error("Failed to fetch universities from Notion:", error);
        return [];
    }
};

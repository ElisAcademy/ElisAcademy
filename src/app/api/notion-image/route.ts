import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

type NotionFile = {
    file?: { url?: string | null };
    external?: { url?: string | null };
};

type NotionImageProperty = {
    type?: string;
    url?: string | null;
    files?: NotionFile[];
    rich_text?: Array<{ plain_text?: string | null }>;
};

type NotionImagePage = {
    cover?: NotionFile | null;
    properties: Record<string, NotionImageProperty>;
};

/**
 * Fetches a fresh image URL from the Notion API for a given page + property.
 * Used as a fallback when the S3 signed URL embedded in the HTML has expired.
 */
async function getFreshUrl(pageId: string, prop: string): Promise<string | null> {
    try {
        const page = await notion.pages.retrieve({ page_id: pageId }) as unknown as NotionImagePage;

        // Special case: page cover image
        if (prop === "cover") {
            return page.cover?.file?.url || page.cover?.external?.url || null;
        }

        // Find the property (try exact match first, then case-insensitive)
        let property = page.properties[prop];
        if (!property) {
            const lowerProp = prop.toLowerCase().replace(/[\s_-]/g, "");
            const key = Object.keys(page.properties).find(
                (k) => k.toLowerCase().replace(/[\s_-]/g, "") === lowerProp
            );
            if (key) property = page.properties[key];
        }
        if (!property) return null;

        if (property.type === "url") return property.url || null;
        const files = property.files;
        if (property.type === "files" && files?.length) {
            const f = files[0];
            return f.file?.url || f.external?.url || null;
        }
        const richText = property.rich_text;
        if (property.type === "rich_text" && richText?.length) {
            return richText[0].plain_text?.trim() || null;
        }
    } catch (err) {
        console.error(`[notion-image] Failed to get fresh URL for ${pageId}/${prop}:`, err);
    }
    return null;
}

/**
 * Proxies Notion S3 images so that temporary signed URLs don't break
 * the Next.js Image component.
 *
 * Usage:
 *   /api/notion-image?url=<encoded-s3-url>&pageId=<id>&prop=<property-name>
 *
 * Strategy:
 *   1. Try fetching the provided `url` (the S3 signed URL embedded at build time).
 *   2. If that fails (403/401 = expired), use `pageId` + `prop` to fetch a
 *      fresh signed URL from the Notion API, then fetch that.
 *   3. Stream the image bytes back to the client with CDN-friendly caching.
 */
export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    const pageId = request.nextUrl.searchParams.get("pageId");
    const prop = request.nextUrl.searchParams.get("prop");

    if (!url) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    try {
        // 1. Fast path — try the embedded S3 URL (usually still valid)
        let imageResponse = await fetch(url, { cache: "no-store" });

        // 2. If expired, try refreshing from the Notion API
        if (!imageResponse.ok && pageId && prop) {
            console.log(`[notion-image] URL expired (${imageResponse.status}), refreshing via Notion API for ${pageId}/${prop}`);
            const freshUrl = await getFreshUrl(pageId, prop);
            if (freshUrl) {
                imageResponse = await fetch(freshUrl, { cache: "no-store" });
            }
        }

        // 3. Still failed — return the error
        if (!imageResponse.ok) {
            return NextResponse.json(
                { error: "Failed to fetch image", status: imageResponse.status },
                { status: imageResponse.status }
            );
        }

        const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
        const buffer = await imageResponse.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                // Cache the proxied image in the browser / CDN for 1 hour.
                // This prevents hammering Notion's S3 on every request while
                // still refreshing before the signed URL expires.
                "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("[notion-image] Proxy error:", error);
        return NextResponse.json({ error: "Failed to proxy image" }, { status: 500 });
    }
}

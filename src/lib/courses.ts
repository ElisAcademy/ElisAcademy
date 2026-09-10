export interface Course {
    title: string;
    code: string;
    description: string;
    prerequisite: string;
}

const sourceBaseUrl = "https://queensglen.com/wp-json/wp/v2/pages?slug=";

function text(value: string) {
    return value
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&#8211;/g, "-")
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
}

export async function getCourses(grade: 9 | 10 | 11 | 12): Promise<Course[]> {
    const response = await fetch(`${sourceBaseUrl}grade${grade}`, {
        next: { revalidate: 86400 },
    });

    if (!response.ok) throw new Error("Unable to load course catalogue");

    const [page] = await response.json() as [{ content: { rendered: string } }];

    return page.content.rendered
        .split(/<div class=['"]course-tab-info['"]>/)
        .slice(1)
        .map((section) => {
            const heading = section.match(/<h4>([\s\S]*?)<\/h4>/)?.[1] ?? "";
            const details = section.match(/<div class=['"]course-tab-description['"][\s\S]*?(?=<div class=['"]col-xs-12 col-sm-4)/)?.[0] ?? "";
            const prerequisite = section.match(/<div class=['"]course-single-prereq['"][\s\S]*?<\/div>/)?.[0] ?? "";
            const [title, code] = text(heading).split(/\s+-\s+(?=[A-Z0-9/]+$)/);

            return { title, code, description: text(details), prerequisite: text(prerequisite).replace(/^Prerequisites?:\s*/i, "") };
        })
        .filter((course) => course.title && course.code && course.description);
}

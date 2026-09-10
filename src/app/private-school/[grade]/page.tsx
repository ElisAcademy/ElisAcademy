import { CourseCatalog } from "@/components/private-school/CourseCatalog";
import { getCourses } from "@/lib/courses";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const grades = [9, 10, 11, 12] as const;

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
    const { grade } = await params;
    return { title: `Grade ${grade} Courses`, description: `Elis Academy Grade ${grade} course descriptions and prerequisites.` };
}

export default async function GradeCoursesPage({ params }: { params: Promise<{ grade: string }> }) {
    const { grade: slug } = await params;
    const grade = Number(slug.replace("grade-", ""));
    if (!grades.includes(grade as typeof grades[number])) notFound();

    const courses = await getCourses(grade as typeof grades[number]);
    return (
        <div className="w-full">
            <Breadcrumbs items={[{ name: "Private School", href: "/private-school/courses" }, { name: `Grade ${grade}` }]} />
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">Grade {grade} Courses</h1>
                <p className="mt-4 text-xl text-gray-200">Course descriptions and prerequisites.</p>
            </div>
            <section className="container mx-auto px-4 py-16"><CourseCatalog courses={courses} /></section>
        </div>
    );
}

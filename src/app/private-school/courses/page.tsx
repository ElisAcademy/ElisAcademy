import { Button } from "@/components/ui/button";
import { CoursesExplorer } from "@/components/private-school/CoursesExplorer";
import { getCourses } from "@/lib/courses";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Private School Courses",
    description: "Explore Elis Academy's Ontario secondary school course offerings, descriptions, and prerequisites.",
};

export default async function CoursesPage() {
    const coursesByGrade = await Promise.all([9, 10, 11, 12].map((grade) => getCourses(grade as 9 | 10 | 11 | 12)));

    return (
        <div className="w-full">
            <Breadcrumbs items={[{ name: "Private School", href: "/private-school/courses" }, { name: "Courses" }]} />
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">Private School Courses</h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-200">Ontario secondary school course offerings for Grades 9 through 12.</p>
            </div>
            <section className="container mx-auto px-4 py-16">
                <section className="mb-16 max-w-4xl border-l-4 border-accent pl-6" aria-labelledby="private-school-heading">
                    <span className="text-sm font-bold uppercase tracking-wider text-accent">Elis Academy Private School</span>
                    <h2 id="private-school-heading" className="mt-2 font-serif text-3xl font-bold text-primary">A focused education for student-athletes.</h2>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">Elis Academy combines Ontario secondary school academics with the structure, guidance, and personal attention student-athletes need to succeed in the classroom and beyond the rink.</p>
                </section>
                <div className="mb-12 flex flex-col items-center justify-between gap-6 bg-gray-50 px-6 py-7 text-center sm:flex-row sm:text-left">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-primary">2026-2027 Ministry Course Calendar</h2>
                        <p className="mt-2 text-gray-600">View the complete course calendar and Ministry information.</p>
                    </div>
                    <Button asChild size="lg" className="w-full shrink-0 whitespace-nowrap sm:w-auto">
                        <a href="/documents/course-calendar-2026-2027.pdf" target="_blank" rel="noreferrer">View Course Schedule</a>
                    </Button>
                </div>
                <CoursesExplorer coursesByGrade={coursesByGrade} />
            </section>
        </div>
    );
}

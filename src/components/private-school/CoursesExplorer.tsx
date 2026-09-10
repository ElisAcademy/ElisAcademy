"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";
import { CourseCatalog } from "@/components/private-school/CourseCatalog";
import { cn } from "@/lib/utils";

const grades = [9, 10, 11, 12] as const;

export function CoursesExplorer({ coursesByGrade }: { coursesByGrade: Course[][] }) {
    const [selectedGrade, setSelectedGrade] = useState<typeof grades[number]>(9);
    const courses = coursesByGrade[selectedGrade - 9];

    return (
        <section>
            <div className="mb-10 flex flex-wrap gap-3 border-y border-gray-100 py-5" aria-label="Filter courses by grade">
                {grades.map((grade) => (
                    <button
                        key={grade}
                        type="button"
                        onClick={() => setSelectedGrade(grade)}
                        className={cn(
                            "rounded-md border px-5 py-2 font-medium transition-colors",
                            selectedGrade === grade ? "border-accent bg-accent text-white" : "border-gray-200 bg-white text-primary hover:border-accent hover:text-accent"
                        )}
                    >
                        Grade {grade}
                    </button>
                ))}
            </div>
            <div className="mb-8 flex items-baseline justify-between gap-4">
                <h2 className="border-l-4 border-accent pl-4 font-serif text-3xl font-bold text-primary">Grade {selectedGrade} Courses</h2>
                <span className="text-sm text-gray-500">{courses.length} courses</span>
            </div>
            <CourseCatalog key={selectedGrade} courses={courses} showMore />
        </section>
    );
}

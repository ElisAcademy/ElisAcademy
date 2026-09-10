"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CourseCatalog({ courses, showMore = false }: { courses: Course[]; showMore?: boolean }) {
    const [visibleCount, setVisibleCount] = useState(5);
    const visibleCourses = showMore ? courses.slice(0, visibleCount) : courses;

    return (
        <div>
            <div className="grid gap-6">
                {visibleCourses.map((course) => (
                    <Card key={course.code} className="border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <CardTitle className="text-2xl">{course.title}</CardTitle>
                            <span className="font-sans text-sm font-bold text-accent">{course.code}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-600 leading-relaxed">
                        <p>{course.description}</p>
                        <p className="border-l-4 border-accent pl-4 text-sm"><span className="font-bold text-primary">Prerequisite: </span>{course.prerequisite || "None"}</p>
                    </CardContent>
                    </Card>
                ))}
            </div>
            {showMore && visibleCount < courses.length && (
                <div className="mt-10 text-center">
                    <Button variant="outline" onClick={() => setVisibleCount((count) => count + 5)}>Show more courses</Button>
                </div>
            )}
        </div>
    );
}

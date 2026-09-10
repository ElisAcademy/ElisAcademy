import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UniversityGrid } from "@/components/programs/UniversityGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "NCAA Applications",
    description: "Your guide to NCAA Division I university athletics. Learn about eligibility requirements, core courses, and how Elis Academy prepares student-athletes for top D1 programs.",
    openGraph: {
        title: "NCAA Applications | Elis Academy",
        description: "Your Guide to University Athletics — requirements, D1 conferences, and target universities.",
    },
};

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function ApplicationsPage() {
    return (
        <div className="w-full">
            <Breadcrumbs items={[
                { name: "Programs", href: "/programs" },
                { name: "NCAA Applications" }
            ]} />
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">NCAA Applications</h1>
                <p className="mt-4 text-xl text-gray-200">Your Guide to University Athletics</p>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-20 space-y-24">

                {/* NCAA Section */}
                <section id="ncaa" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-2 bg-accent rounded-full"></div>
                        <h2 className="text-4xl font-serif font-bold text-primary">NCAA Applications</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                            <p className="text-gray-600 mb-6">
                                To compete in NCAA Division I sports, you must meet academic and amateurism standards set by the NCAA Eligibility Center.
                            </p>
                            <ul className="space-y-3">
                                {["Graduate from high school", "Complete 16 core courses", "Minimum GPA in core courses", "SAT or ACT scores (if applicable)", "Amateurism certification"].map(item => (
                                    <li key={item} className="flex items-start">
                                        <Check className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Card className="bg-gray-50 border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Division 1 Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    There are 60 NCAA Division I hockey universities and colleges. We provide guidance in matching schools with your particular academic and athletic goals.
                                </p>
                                <div className="space-y-2">
                                    <div className="font-semibold text-primary">Top D1 Conferences:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {["Atlantic Hockey ", "Big 10", "ECAC", "Hockey East", "NCHC", "WCHA"].map(c => (
                                            <span key={c} className="bg-white px-3 py-1 rounded-md text-sm border shadow-sm">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <hr className="border-gray-200" />

                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-2 bg-primary rounded-full"></div>
                        <h2 className="text-3xl font-serif font-bold text-primary">Target Division 1 Universities</h2>
                    </div>
                    <p className="text-gray-600 mb-8 text-lg">
                        We help our student-athletes target and connect with the best NCAA Division I programs across the country.
                    </p>

                    <UniversityGrid />
                </section>
            </div>
        </div>
    );
}

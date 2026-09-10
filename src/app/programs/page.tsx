import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Programs",
    description: "Explore Elis Academy's programs: our flagship Elite Program for full-time student-athletes, and detailed NCAA & Canadian university application guidance.",
    openGraph: {
        title: "Programs | Elis Academy",
        description: "Private school education and elite hockey training for student-athletes pursuing university and professional opportunities.",
    },
};

export default function ProgramsPage() {
    return (
        <div className="w-full">
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold animate-fade-in-up">Our Programs</h1>
                <p className="mt-4 text-xl text-gray-200">Pathways to Success</p>
            </div>
            <section className="py-20 container mx-auto px-4">
                <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-16 leading-relaxed">
                    Elis Academy offers a comprehensive range of programs designed to develop elite athletes
                    and academic scholars. Whether you are looking for full-time training or guidance on university applications,
                    we have the resources to support your journey.
                </p>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="hover:shadow-xl transition-shadow border-none shadow-md bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-3xl">Elite Program</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <p className="mb-8 text-gray-600 leading-relaxed">
                                Our flagship full-time program for student-athletes seeking the highest level of training and academic support.
                                Includes daily training sessions, personalized coaching, and academic tutoring.
                            </p>
                            <div className="mt-auto pt-6">
                                <Button asChild size="lg" className="w-full">
                                    <Link href="/programs/elite">View Program Details</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-xl transition-shadow border-none shadow-md bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-3xl">Applications & Requirements</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <p className="mb-8 text-gray-600 leading-relaxed">
                                Detailed information and guidance on applying to NCAA Division 1 schools and Canadian Universities.
                                Understanding the requirements is the first step to your future.
                            </p>
                            <div className="mt-auto pt-6">
                                <Button asChild size="lg" variant="secondary" className="w-full">
                                    <Link href="/programs/applications">View Requirements</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}

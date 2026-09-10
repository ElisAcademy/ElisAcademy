import { Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Canadian University Applications",
    description: "Guide to applying to Canadian universities and U SPORTS varsity programs. Application steps, OUAC process, and requirements for Ontario student-athletes.",
    openGraph: {
        title: "Canadian University Applications | Elis Academy",
        description: "Your Guide to Canadian University Athletics — OUAC applications, U SPORTS, and varsity recruitment.",
    },
};

export default function CanadianProgramPage() {
    return (
        <div className="w-full">
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">Canadian University Applications</h1>
                <p className="mt-4 text-xl text-gray-200">Your Guide to University Athletics</p>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-20 space-y-24">

                {/* Canadian University Section */}
                <section id="canadian" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-2 bg-primary rounded-full"></div>
                        <h2 className="text-4xl font-serif font-bold text-primary">Canadian University Applications</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Application Steps</h3>
                            <ol className="space-y-4 list-decimal list-inside text-gray-700">
                                <li className="pl-2">Research universities and varsity programs (U SPORTS).</li>
                                <li className="pl-2">Prepare application via OUAC (Ontario) or direct institution portals.</li>
                                <li className="pl-2">Submit transcripts and supplementary documents.</li>
                                <li className="pl-2">Contact varsity coaches directly with athletic CV.</li>
                            </ol>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 flex items-center">
                                <Info className="mr-2 text-primary" />
                                Requirements
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Admission is generally based on Grade 12 top 6 average. Athletic recruitment does not guarantee admission but can support your application.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm font-medium text-primary">
                                    <div className="h-2 w-2 rounded-full bg-accent mr-3"></div>
                                    High School Diploma (OSSD)
                                </li>
                                <li className="flex items-center text-sm font-medium text-primary">
                                    <div className="h-2 w-2 rounded-full bg-accent mr-3"></div>
                                    Program-specific prerequisites
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

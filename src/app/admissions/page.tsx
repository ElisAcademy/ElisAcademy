import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admissions",
    description: "Apply to Elis Academy. Learn about our admissions process, tuition and fees, and what it takes to join our elite student-athlete program in Aurora, Ontario.",
    openGraph: {
        title: "Admissions | Elis Academy",
        description: "Join the Elis Academy Family — tuition details, application process, and enrollment information.",
    },
};

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function AdmissionsPage() {
    return (
        <div className="w-full">
            <Breadcrumbs items={[{ name: "Admissions" }]} />
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">Admissions</h1>
                <p className="mt-4 text-xl text-gray-200">Join the Elis Academy Family</p>
            </div>

            <section className="py-20 container mx-auto px-4 max-w-5xl">

                {/* Tuition & Fees */}
                <div className="mb-20">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Tuition & Fees</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="p-4 border-b">Program</th>
                                    <th className="p-4 border-b">Tuition per Semester</th>
                                    <th className="p-4 border-b">Includes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-4 font-medium">Private Schooling</td>
                                    <td className="p-4">TBD</td>
                                    <td className="p-4 text-sm text-gray-600">Ontario secondary school education</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">Part-Time Elite Hockey</td>
                                    <td className="p-4">$3,700</td>
                                    <td className="p-4 text-sm text-gray-600">Academic tutoring, on-ice training, off-ice strength and conditioning</td>
                                </tr>
                                {/* <tr>
                                    <td className="p-4 font-medium">Part-Time / Seasonal</td>
                                    <td className="p-4">Varies</td>
                                    <td className="p-4 text-sm text-gray-600">Training sessions, seasonal camps</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">International Students</td>
                                    <td className="p-4">$XX,XXX</td>
                                    <td className="p-4 text-sm text-gray-600">Includes boarding/homestay support, visa assistance</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    {/* <p className="mt-4 text-sm text-center text-gray-500">* Financial aid and scholarships may be available for qualifying students.</p> */}
                </div>

                {/* Admissions Process */}
                <div className="mb-20">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Admissions Process</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                            <h3 className="text-xl font-bold mb-3">Application</h3>
                            <p className="text-gray-600">Submit the online inquiry form along with academic transcripts and athletic portfolio.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                            <h3 className="text-xl font-bold mb-3">Evaluation</h3>
                            <p className="text-gray-600">Assessments include academic review and player interview.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                            <h3 className="text-xl font-bold mb-3">Acceptance</h3>
                            <p className="text-gray-600">Upon acceptance, families complete enrollment and secure their spot.</p>
                        </div>
                    </div>
                </div>

                {/* Acceptance / Confirmation Section */}
                <Card className="bg-gray-50 border-none mb-12">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Acceptance & Confirmation</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                            A non-refundable deposit is required to confirm your acceptance. Welcome packages and schedule details will be sent upon confirmation.
                        </p>
                        <div className="flex justify-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center"><Check className="h-4 w-4 mr-1 text-green-500" /> Secure Payment</span>
                            <span className="flex items-center"><Check className="h-4 w-4 mr-1 text-green-500" /> Instant Confirmation</span>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Apply?</h2>
                    <Button asChild size="lg" className="px-12 text-lg">
                        <Link href="/contact">Contact Admissions</Link>
                    </Button>
                </div>

            </section>
        </div>
    );
}

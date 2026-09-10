import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, HandHeart, ImageIcon, Palette } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Volunteer",
    description: "Volunteer with Elis Academy through our Little Library, Arts Auction, and Food Bank initiatives.",
    openGraph: {
        title: "Volunteer | Elis Academy",
        description: "Give Back to the Community — volunteer opportunities for passionate individuals.",
    },
};

export default function VolunteerPage() {
    const opportunities = [
        {
            title: "Little Library",
            icon: BookOpen,
            description: "Help sort, organize, and share books that keep our Little Library welcoming for students and families.",
            placeholder: "from-sky-100 via-white to-blue-50",
        },
        {
            title: "Arts Auction",
            icon: Palette,
            description: "Support student creativity by helping prepare, display, and celebrate work at our community arts auction.",
            placeholder: "from-amber-100 via-white to-orange-50",
        },
        {
            title: "Food Bank",
            icon: HandHeart,
            description: "Help collect, sort, and deliver food donations for local families through our community food bank.",
            placeholder: "from-emerald-100 via-white to-green-50",
        },
    ];

    return (
        <div className="w-full">
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">Volunteer</h1>
                <p className="mt-4 text-xl text-gray-200">Give Back to the Community</p>
            </div>

            <section className="px-4 py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Join Our Team</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We are always looking for passionate individuals to support our mission.
                        Whether you have a few hours a week or can commit to specific events, your contribution makes a difference.
                    </p>
                </div>
            </section>

            <div>
                {opportunities.map((opportunity, index) => {
                    const isDark = index === 1;

                    return (
                        <section key={opportunity.title} className={isDark ? "bg-primary text-white" : index === 0 ? "bg-gray-50" : "bg-accent/5"}>
                            <div className="grid md:min-h-[440px] md:grid-cols-2">
                                <div className={`relative flex min-h-[360px] items-center justify-center bg-gradient-to-br ${opportunity.placeholder} ${index % 2 === 1 ? "md:order-2" : ""}`}>
                                <div className="flex flex-col items-center gap-3 text-primary/70">
                                    <div className="rounded-full bg-white/80 p-4 shadow-sm">
                                        <ImageIcon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <span className="text-sm font-medium">Photo coming soon</span>
                                </div>
                                </div>
                                <div className="flex items-center px-8 py-16 md:px-16 lg:px-24">
                                    <div className="max-w-md">
                                        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${isDark ? "bg-white/10 text-white" : "bg-primary/5 text-primary"}`}>
                                            <opportunity.icon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <h3 className={`font-serif text-3xl font-bold ${isDark ? "text-white" : "text-primary"}`}>{opportunity.title}</h3>
                                        <p className={`mt-4 leading-relaxed ${isDark ? "text-gray-200" : "text-gray-600"}`}>{opportunity.description}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            <section className="bg-white py-16 text-center">
                    <Button asChild size="lg" className="px-8">
                        <Link href="/contact?subject=Volunteer">
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
            </section>
        </div>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Medal, Trophy } from "lucide-react";
import { getCoaches } from "@/lib/notion";
import { NotionImage } from "@/components/ui/NotionImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Private School & Hockey Academy",
    description: "Learn about Elis Academy's private school program, elite hockey training, and the teachers and coaches who support student-athletes in Aurora, Ontario.",
    openGraph: {
        title: "About Elis Academy",
        description: "Private school education and elite hockey training. Meet the teachers and coaches behind Elis Academy.",
    },
};

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const revalidate = 300;

export default async function AboutPage() {
    const staff = await getCoaches();
    const staffGroups = [
        { title: "Teachers", members: staff.filter((member) => member.type === "Teacher") },
        { title: "Coaches", members: staff.filter((member) => member.type === "Coach") },
    ];
    const features = [
        { title: "Academic Excellence", icon: GraduationCap, desc: "Our Ontario-Certified Teachers" },
        { title: "Elite Hockey Training", icon: Medal, desc: "Former Professional Hockey Players" },
        { title: "Student Development", icon: Users, desc: "A supportive private-school environment helps students build leadership, discipline, teamwork, and self-advocacy." },
        { title: "Proven Pathways", icon: Trophy, desc: "We help student-athletes pursue university opportunities, including NCAA Division I pathways." },
    ];

    return (
        <div className="w-full">
            <Breadcrumbs items={[{ name: "About Us" }]} />
            {/* Header */}
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold animate-fade-in-up">About Elis Academy</h1>
                <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">Private School Education &amp; Elite Hockey Training in Aurora, Ontario</p>
            </div>

            {/* Intro */}
            <section className="py-20 bg-white" aria-label="Our philosophy and mission">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <span className="text-accent font-bold tracking-wider uppercase text-sm">Our Philosophy</span>
                    <h2 className="text-3xl font-serif font-bold text-primary mt-2 mb-6">Education and Hockey Training, Under One Roof</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Elis Academy is a private school in Aurora, Ontario for student-athletes who want a strong Ontario secondary education and elite hockey training in the same environment. Our teachers and coaches work together to help students grow in the classroom, on the ice, and on their path to university.
                    </p>
                </div>
            </section>

            {/* 4 Boxes */}
            <section className="py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <Card key={i} className="text-center border-none shadow-md hover:shadow-xl transition-all duration-300">
                            <CardHeader className="flex flex-col items-center pt-8">
                                <div className="p-4 bg-accent/10 rounded-full mb-4">
                                    <f.icon className="h-8 w-8 text-accent" />
                                </div>
                                <CardTitle className="text-xl">{f.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary">Meet Our Team</h2>
                        <p className="mt-4 text-gray-600">Our teachers support each student&apos;s education, while our coaches bring high-level hockey experience to every stage of development.</p>
                    </div>

                    {staffGroups.map(({ title, members }) => (
                        <div key={title} className="mb-20 last:mb-0">
                            <h3 className="text-2xl font-bold text-primary border-l-4 border-accent pl-4 mb-8">{title}</h3>
                            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {members.map((member) => (
                                    <div key={member.id} className="group">
                                        <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                                            {member.image ? (
                                                <NotionImage
                                                    src={member.image}
                                                    alt={`${member.name}, ${member.role} at Elis Academy`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif bg-gray-200">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-lg text-primary">{member.name}</h4>
                                        <p className="text-accent text-sm font-medium">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* <div>
                        <h3 className="text-2xl font-bold text-primary border-l-4 border-accent pl-4 mb-8">Academic Faculty</h3>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="group">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif">Teacher {i}</div>
                                    </div>
                                    <h4 className="font-bold text-lg text-primary">Coming Soon</h4>
                                    <p className="text-accent text-sm font-medium">Instructor</p>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    )
}

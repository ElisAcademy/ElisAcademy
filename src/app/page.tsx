import Link from "next/link";
import Image from "next/image";
import { NotionImage } from "@/components/ui/NotionImage";
import { User } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { getHeroSlides, getStudents, getAlumni, type Student } from "@/lib/notion";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { Button } from "@/components/ui/button";

interface Owner {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const OWNERS: Owner[] = [
  {
    name: "Justin Auger",
    role: "Hockey Operations",
    bio: "Justin was drafted to the OHL's Guelph Storm in 2010. After three years with the team, he was drafted and signed by the L.A. Kings of the NHL in 2013. Justin spent the next six seasons playing professional hockey in North America. In 2015, he won the Calder Cup as a member of the Manchester Monarchs of the AHL.",
    image: "/pics/owner/owner1.webp",
  },
  {
    name: "Ian Sands",
    role: "Principal",
    bio: "After graduation from university, Ian immediately began writing and editing English. He soon moved into teaching English at public schools, private schools, and tutoring centres. Then, he transitioned into a principal role at a Richmond Hill private school overseeing the administration of Ontario Secondary School credits and diplomas.",
    image: "/pics/owner/owner2.webp",
  },
  {
    name: "Tom Lawson",
    role: "Athletics Director",
    bio: "Tom attended Bowling Green State university on a full athletic scholarship. He then played 10 years of professional hockey in North America and Europe including for the Colorado Avalanche organization of the NHL. After retiring from professional hockey, Tom began his coaching and training career preparing young people for the NCAA and OHL.",
    image: "/pics/owner/owner3.webp",
  },
];

function StudentCard({ student, className }: { student: Student; className: string }) {
  return (
    <div className={`group relative ${className} shrink-0 overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] shadow-sm hover:shadow-xl transition-all`}>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        {student.image ? (
          <NotionImage
            src={student.image}
            alt={`${student.name} — student-athlete at Elis Academy, ${student.program}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <User className="h-16 w-16 text-gray-400/50" />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-5 pt-16 transition-opacity duration-300 md:inset-0 md:p-6 md:opacity-0 md:group-hover:opacity-100">
        <h4 className="text-lg font-bold text-white">{student.name}</h4>
        <p className="text-sm text-gray-200">{student.program} • {student.year}</p>
        <p className="text-sm text-gray-200">{student.team}</p>
      </div>
    </div>
  );
}

export const revalidate = 300;

export default async function Home() {
  const slides = await getHeroSlides();
  const students = (await getStudents()).sort((a, b) => {
    const getLastName = (name: string) =>
      name.trim().split(/\s+/).pop() || "";

    const lastA = getLastName(a.name);
    const lastB = getLastName(b.name);

    const lastCompare = lastA.localeCompare(lastB, undefined, {
      sensitivity: "base",
    });

    if (lastCompare !== 0) return lastCompare;

    // tie-breaker by full name
    return a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    });
  });

  const alumni = await getAlumni();
  const honorRollStudents = students.filter((student) => student.type === "Honor Roll");
  const regularStudents = students.filter((student) => student.type === "Student");
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <HeroSlider slides={slides} />

      {/* Welcome Section */}
      <section className="py-24 bg-primary" aria-label="About Elis Academy">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <span className="text-accent font-bold tracking-wider uppercase text-sm">
                About Us
              </span>
              <h2 className="text-4xl font-serif font-bold text-white">
                Welcome to Elis Academy — Aurora, Ontario
              </h2>
              <p className="text-lg text-white leading-relaxed">
                Elis Academy is a private school and elite hockey program in Aurora, Ontario. We combine Ontario secondary school education with professional on-ice training, preparing student-athletes for university and professional opportunities.
              </p>
              <p className="text-lg text-white leading-relaxed">
                Founded by former professional hockey players and experienced educators, our coaching staff brings decades of NHL, AHL, and OHL experience to every training session. We invite families across the GTA to join our academy and experience the Elis difference.
              </p>
              <Button
                variant="outline"
                className="border-white text-primary hover:bg-white hover:text-white hover:border-accent hover:bg-accent mt-4"
                asChild
              >
                <Link href="/about">Read More About Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              {/* Placeholder for Welcome Image - Replace with real image */}
              <div
                className="absolute inset-0 bg-gray-200 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/pics/teacher.jpeg')"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <NewsPreview />

      {/* THREE OWNERS Section */}
      <section className="py-24 bg-primary" aria-label="Elis Academy coaching and leadership team">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-accent font-bold tracking-wider uppercase text-sm">
              Leadership
            </span>
            <h2 className="text-4xl font-serif font-bold text-white mt-2">
              Meet Our Coaching &amp; Leadership Team
            </h2>
            <p className="mt-4 text-gray-300">
              Guiding Elis Academy with decades of combined NHL, AHL, OHL, and NCAA experience in elite hockey development and educational leadership.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {OWNERS.map((owner, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-72 h-72 rounded-full bg-white mb-6 overflow-hidden relative shadow-md border-4 border-white transition-colors">
                  <Image
                    src={owner.image}
                    alt={`${owner.name} — ${owner.role} at Elis Academy hockey training program`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-3xl font-bold text-white">{owner.name}</h3>
                <p className="text-xl text-accent font-medium mb-3">
                  {owner.role}
                </p>
                <p className="text-md text-gray-300 max-w-xs px-4">
                  {owner.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENTS Section */}
      <section className="py-24 bg-white border-t border-gray-100" aria-label="Current student-athletes at Elis Academy">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent font-bold tracking-wider uppercase text-sm">
                Community
              </span>
              <h2 className="text-3xl font-serif font-bold text-primary mt-2">
                Our Student-Athletes
              </h2>
            </div>
            <Button variant="link" asChild className="hidden md:inline-flex">
              <Link href="/admissions">Join Our Team &rarr;</Link>
            </Button>
          </div>
        </div>

        {honorRollStudents.length > 0 && (
          <div className="mx-auto mb-12 max-w-7xl px-4 md:px-6">
            <h3 className="font-serif text-2xl font-bold text-primary">Honor Roll</h3>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              {honorRollStudents.map((student) => (
                <StudentCard key={student.id} student={student} className="w-full" />
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mb-6 max-w-7xl px-4 md:px-6">
          <h3 className="font-serif text-2xl font-bold text-primary">All Student-Athletes</h3>
        </div>
        <div className="w-full px-4 md:px-6">
          <div className="student-carousel overflow-hidden rounded-2xl">
            <div className="student-track flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-5 pr-5" aria-hidden={copy === 1}>
                  {regularStudents.map((student) => (
                    <StudentCard
                      key={`${copy}-${student.id}`}
                      student={student}
                      className="w-[calc((100vw-3.25rem)/2)] md:w-[280px] lg:w-[300px]"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes student-scroll {
              to { transform: translateX(-50%); }
            }
            .student-carousel {
              -webkit-mask-image: linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent);
              mask-image: linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent);
            }
            .student-track { animation: student-scroll 45s linear infinite; }
            .student-carousel:hover .student-track { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) {
              .student-track { animation-play-state: paused; }
            }
          `}</style>
        </div>
      </section>

      {/* ALUMNI Section */}
      <section className="py-24 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-5/12">
            {alumni.map((alum, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] shadow-sm hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gray-200">
                  <NotionImage
                    src={alum.image}
                    alt={alum.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <h4 className="text-white font-bold text-lg">{alum.name}</h4>
                  <p className="text-gray-200 text-sm">
                    {alum.university} • &apos;{alum.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-7/12 flex flex-col text-left">
            <h2 className="text-4xl font-serif font-bold mb-6 text-white">
              Our Alumni
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Elis Academy graduates have gone on to accept offers from Ivy
              League NCAA Division 1 universities.
            </p>

            <div className="mt-8 relative p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm text-left animate-fade-in-up">
              <span className="text-accent font-bold tracking-wider uppercase text-xs mb-3 block">
                Alumni Spotlight
              </span>
              <h3 className="text-3xl font-serif font-bold text-white mb-2">
                Alex Assadourian
                <span className="text-gray-400 font-sans text-lg ml-2 font-normal">
                  &apos;25
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Alex played three seasons for the York Simcoe Express before being drafted into the OHL. His junior career included stops in Sudbury, Niagara, Barrie, and Chicago. After graduating from Elis Academy, Alex was accepted to <span className="text-white font-semibold">Yale University</span> on a full scholarship for the 2026-2027 academic year.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
{
  /* <section className="py-24 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Our Alumni Network</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
            Elis Academy graduates have gone on to compete at NCAA Division I universities and professional levels across the globe.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {alumni.map((alumni, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] shadow-sm hover:shadow-xl transition-all">
                <div className="absolute inset-0 bg-gray-200">
                  <Image
                    src={alumni.image}
                    alt={alumni.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
             
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <h4 className="text-white font-bold text-lg">{alumni.name}</h4>
                  <p className="text-gray-200 text-sm">{alumni.university} • '{alumni.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */
}

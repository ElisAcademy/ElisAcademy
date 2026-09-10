import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-primary text-white -mt-20" aria-label="Hero — Elis Academy, Elite Hockey Training in Aurora, Ontario">

            {/* VIDEO SECTION */}
            {/* <div className="relative w-screen h-[100vh] max-h-[100svh] overflow-hidden">
                <iframe
                // original video link: "https://player.vimeo.com/video/1073355184?h=0840bdbe46&background=1&autoplay=1&loop=1&muted=1"
                    src="https://vimeo.com/1183822553?share=copy&fl=sv&fe=ci"
                    className="
      absolute
      top-1/2
      left-1/2
      w-full
      h-[177.77vw]
      -translate-x-1/2
      -translate-y-41/83
    "
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    title="Elis Academy training highlights — elite hockey and sports training in Aurora, Ontario"
                />
            </div> */}
            <div className="relative h-[100svh] w-full overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/videos/homepage-video.mp4" type="video/mp4" />
                </video>
            </div>



            {/* 📝 CONTENT SECTION */}
            <div className="relative z-20 w-full bg-primary px-4 py-24 md:px-6 lg:py-32">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center animate-fade-in-up">

                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10 hover:border-accent/40">
                        <span className="mr-2 relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Welcome to Elis Academy
                    </div>

                    {/* Heading */}
                    <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
                        Elite Hockey &amp; Sports <br className="hidden md:block" />
                        Academy in <span className="inline-block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                            Aurora, Ontario
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="mt-8 max-w-2xl text-lg text-slate-200 md:text-xl lg:text-2xl leading-relaxed font-light">
                        Elis Academy is a private school and elite hockey training academy in Aurora, Ontario. Student-athletes receive an Ontario secondary school education alongside professional-level on-ice training, preparing them for NCAA Division I scholarships and professional hockey careers.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                        <Button size="lg" className="h-14 min-w-[180px] rounded-full bg-accent px-8 text-lg font-semibold text-white shadow-lg shadow-accent/20 transition-transform hover:scale-105 hover:bg-accent/90" asChild>
                            <Link href="/programs/elite">View Programs</Link>
                        </Button>

                        <Button size="lg" variant="outline" className="h-14 min-w-[180px] rounded-full border-slate-200 bg-white px-8 text-lg font-semibold text-primary shadow-sm transition-all hover:text-primary/90 hover:scale-105 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md" asChild>
                            <Link href="/private-school/courses">
                                Private School <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

        </section>

    );
}

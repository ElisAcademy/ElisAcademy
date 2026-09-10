import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FooterProps {
    variant?: "light" | "dark";
}

export function Footer({ variant = "light" }: FooterProps) {
    const isDark = variant === "dark";

    return (
        <footer className={cn(
            "w-full py-12 transition-colors duration-300",
            isDark ? "bg-primary text-white" : "bg-white text-primary"
        )}>
            <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-8 md:grid-cols-4">
                <div className="md:col-span-2 flex flex-col items-center justify-center -mt-4">
                    <Link href="/" className="">
                        <div className="relative h-30 w-48">
                            <Image
                                src={isDark ? "/logo/logo-white.png" : "/logo/logo-blue.png"}
                                alt="Elis Academy"
                                fill
                                className="object-contain -ml-2"
                                priority
                            />
                        </div>
                    </Link>
                    <p className={cn(
                        "mt-4 max-w-xs text-sm leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        Private school and elite hockey program in Aurora, Ontario. Combining Ontario secondary school education with professional hockey training to prepare student-athletes for university and beyond.
                    </p>
                </div>

                <nav aria-label="Footer navigation">
                    <h3 className={cn("font-semibold mb-4", isDark ? "text-white" : "text-primary")}>Quick Links</h3>
                    <ul className={cn("space-y-2 text-sm", isDark ? "text-gray-300" : "text-gray-600")}>
                        <li>
                            <Link href="/about" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                About Elis
                            </Link>
                        </li>
                        <li>
                            <Link href="/programs/elite" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                Elite Program
                            </Link>
                        </li>
                        <li>
                            <Link href="/programs/ncaa" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                NCAA Pathway
                            </Link>
                        </li>
                        <li>
                            <Link href="/programs/canadian" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                Canadian University
                            </Link>
                        </li>
                        <li>
                            <Link href="/admissions" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                Admissions
                            </Link>
                        </li>
                        <li>
                            <Link href="/volunteer" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                Volunteer
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                News &amp; Events
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div itemScope itemType="https://schema.org/LocalBusiness">
                    <h3 className={cn("font-semibold mb-4", isDark ? "text-white" : "text-primary")}>Contact Us</h3>
                    <address className={cn("space-y-2 text-sm not-italic", isDark ? "text-gray-300" : "text-gray-600")}>
                        <p itemProp="name" className="sr-only">Elis Academy</p>
                        <p>
                            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                <span itemProp="streetAddress">135 Industrial Pkwy N</span><br />
                                <span itemProp="addressLocality">Aurora</span>,{" "}
                                <span itemProp="addressRegion">ON</span>{" "}
                                <span itemProp="postalCode">L4G 4C4</span>
                            </span>
                        </p>
                        <p>
                            <a href="mailto:info@elisacademy.ca" itemProp="email" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                info@elisacademy.ca
                            </a>
                        </p>
                        <p>
                            <a href="tel:+12898940806" itemProp="telephone" className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-primary")}>
                                +1 289 894 0806
                            </a>
                        </p>
                    </address>
                </div>
            </div>
            <div className={cn(
                "mt-12 pt-8 border-t text-center text-sm",
                isDark ? "border-white/10 text-gray-400" : "border-gray-100 text-gray-500"
            )}>
                &copy; {new Date().getFullYear()} Elis Academy. All rights reserved.
            </div>
        </footer>
    );
}

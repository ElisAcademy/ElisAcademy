"use client";

import { School } from "lucide-react";
import Image from "next/image";

export function UniversityIcon({ domain, name }: { domain: string, name: string }) {
    return (
        <div className="h-16 w-16 relative grayscale group-hover:grayscale-0 transition-all duration-300 flex items-center justify-center">
            <Image
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
                alt={`${name} logo`}
                width={64}
                height={64}
                unoptimized
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
            />
            <School className="fallback-icon hidden h-10 w-10 text-gray-300 absolute" />
        </div>
    )
}

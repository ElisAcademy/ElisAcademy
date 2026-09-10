import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/Navbar";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elisacademy.ca'),
  verification: {
    google: "4caMhD2wg17sUw-ZIJnURrCjfPrPOFrOZNVka21tyFg",
  },
  title: {
    default: "Elis Academy",
    template: "%s | Elis Academy"
  },
  description: "Elis Academy is a private school and elite hockey program in Aurora, Ontario. We combine Ontario secondary school education with professional training for student-athletes pursuing university and hockey opportunities.",
  keywords: [
    "Elis Academy", "hockey academy Ontario", "elite sports training Aurora",
    "NCAA hockey scholarship", "student athlete program", "hockey training near me",
    "private sports school Ontario", "youth hockey development", "Aurora ON sports academy",
    "ice hockey training GTA", "hockey prep school Canada", "NCAA Division 1 hockey",
    "Ontario secondary school sports", "elite hockey coaching"
  ],
  authors: [{ name: "Elis Academy" }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://elisacademy.ca',
    title: "Elis Academy | Premier Sports & Education",
    description: "Private school education and elite hockey training for student-athletes in Aurora, Ontario.",
    siteName: "Elis Academy",
    images: [
      {
        url: '/logo/logo-white.png', // Assuming logo exists, or use a general hero image
        width: 1200,
        height: 630,
        alt: 'Elis Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elis Academy",
    description: "Preparing student-athletes for the NCAA and professional levels.",
    images: ['/logo/logo-white.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["EducationalOrganization", "SportsActivityLocation"],
              "name": "Elis Academy",
              "url": "https://elisacademy.ca",
              "logo": "https://elisacademy.ca/logo/logo-white.png",
              "image": "https://elisacademy.ca/logo/logo-white.png",
              "description": "Elis Academy is a private school and elite hockey program in Aurora, Ontario. We combine Ontario secondary school education with professional hockey training to prepare student-athletes for university opportunities.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "135 Industrial Pkwy N",
                "addressLocality": "Aurora",
                "addressRegion": "ON",
                "postalCode": "L4G 4C4",
                "addressCountry": "CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 44.008,
                "longitude": -79.462
              },
              "telephone": "+1-365-887-5989",
              "email": "elisacademyca@gmail.com",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [],
              "foundingDate": "2024",
              "areaServed": [
                { "@type": "City", "name": "Aurora, Ontario" },
                { "@type": "City", "name": "Richmond Hill, Ontario" },
                { "@type": "City", "name": "Newmarket, Ontario" },
                { "@type": "State", "name": "Ontario, Canada" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Training Programs",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Elite Hockey Program",
                      "description": "Full-time program combining daily on-ice training, strength & conditioning, and Ontario secondary school academics for student-athletes.",
                      "provider": { "@type": "Organization", "name": "Elis Academy" }
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "NCAA Pathway Program",
                      "description": "Guidance and preparation for NCAA Division I university athletics eligibility and applications.",
                      "provider": { "@type": "Organization", "name": "Elis Academy" }
                    }
                  }
                ]
              },
              "sport": ["Ice Hockey"]
            })
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} antialiased bg-white text-primary font-sans flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <FooterWrapper />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

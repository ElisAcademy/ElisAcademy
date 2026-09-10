"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { NotionImage } from "@/components/ui/NotionImage";
import { HeroSlide } from "@/lib/notion";
import { Play } from "lucide-react";

// Helper to check for direct video files vs iframes
const isDirectVideo = (url: string) => {
    if (url.startsWith("/api/notion-image")) return true;
    return url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
};

// Helper to extract a Google Drive file ID from any Drive URL format
const getDriveFileId = (url: string): string | null => {
    // Matches /file/d/FILE_ID or /d/FILE_ID
    const fileMatch = url.match(/\/(?:file\/)?d\/([^/?&]+)/);
    if (fileMatch) return fileMatch[1];
    // Matches id=FILE_ID query param (used by uc?export=view&id=... links)
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch) return idMatch[1];
    return null;
};

// Helper to process video URLs (Google Drive, Vimeo)
const getVideoEmbedSrc = (url: string, autoplay: boolean = false) => {
    if (url.includes("drive.google.com") || url.includes("drive.usercontent.google.com")) {
        const id = getDriveFileId(url);
        return id ? `https://drive.google.com/file/d/${id}/preview` : url.replace(/\/view.*/, "/preview");
    }

    // Vimeo
    if (url.includes("vimeo.com")) {
        const vimeoRegex = /vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/;
        const match = url.match(vimeoRegex);
        const videoId = match ? match[1] : url.split('/').pop();
        const hash = match && match[2] ? `?h=${match[2]}` : '';
        const separator = hash ? '&' : '?';

        if (url.includes('player')) return url;

        // Standard Vimeo Player
        // Add autoplay param if requested
        const params = [`title=0`, `byline=0`, `portrait=0`];
        if (autoplay) params.push(`autoplay=1`, `muted=0`);

        return `https://player.vimeo.com/video/${videoId}${hash}${separator}${params.join('&')}`;
    }

    return url;
};

// Individual Slide Component for Lazy Loading
const VideoCard = ({ slide }: { slide: HeroSlide }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const swiper = useSwiper();

    const handlePlay = () => {
        swiper.autoplay.stop();
        setIsPlaying(true);
    };

    if (isPlaying && slide.videoUrl) {
        // Active Video State
        return (
            <div className="relative h-full w-full bg-black">
                {isDirectVideo(slide.videoUrl) ? (
                    <video
                        className="block h-full w-full object-cover"
                        src={slide.videoUrl}
                        controls
                        autoPlay
                        playsInline
                    />
                ) : (
                    <iframe
                        src={getVideoEmbedSrc(slide.videoUrl, true)}
                        className="absolute -top-[7%] block h-[114%] w-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={slide.title}
                    ></iframe>
                )}
            </div>
        );
    }

    // Lazy / Thumbnail State
    return (
        <div
            className="relative h-full w-full cursor-pointer group bg-gray-900"
            onClick={handlePlay}
        >
            {slide.imageUrl ? (
                <NotionImage
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
            ) : (
                // Fallback placeholder if no image
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-200 text-3xl font-bold font-serif">Elis Academy</span>
                </div>
            )}

            {/* Dark Overlay + Play Button — only for Video type */}
            {slide.type === "Video" && slide.videoUrl && (
                <>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 shadow-lg">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                    </div>
                </>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="text-white font-medium text-lg leading-tight drop-shadow-md line-clamp-2">
                    {slide.title}
                </h3>
            </div>
        </div>
    );
};

// Main Component
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
    if (!slides || slides.length === 0) return null;

    return (
        <section className="w-full bg-white py-16 border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 md:px-6 mb-10">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-accent font-bold tracking-wider uppercase text-sm">Media</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-2">Latest Videos</h2>
                    <p className="text-gray-600 mt-4 text-lg">
                        Watch highlights, training sessions, and moments from Elis Academy.
                    </p>
                </div>
            </div>

            <div className="w-full px-4 md:px-6">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    style={{
                        "--swiper-navigation-color": "color-mix(in srgb, var(--primary) 30%, white)",
                        "--swiper-navigation-top-offset": "calc((100% - 3.5rem) / 2)",
                        "--swiper-pagination-color": "var(--primary)",
                    } as React.CSSProperties}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    centeredSlides={false}
                    loop={true}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: true,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="w-full !pb-14 gallery-swiper"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id} className="relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-gray-100">
                            <VideoCard slide={slide} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

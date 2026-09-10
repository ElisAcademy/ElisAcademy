"use client";

import Image, { ImageProps } from "next/image";

/**
 * A drop-in replacement for `next/image` that gracefully handles
 * Notion S3 signed image URLs which expire after ~1 hour.
 *
 * When the `src` is a Notion proxy URL (`/api/notion-image?url=...`),
 * we render it as `unoptimized` to prevent Next.js Image Optimization
 * from trying to re-fetch (and failing on) the upstream signed URL.
 * The proxy route itself handles fetching and caching.
 *
 * For all other URLs, the component delegates to `next/image` as usual.
 */
export function NotionImage(props: ImageProps) {
    const src = typeof props.src === "string" ? props.src : "";
    const isProxied = src.startsWith("/api/notion-image");

    return <Image {...props} alt={props.alt} unoptimized={isProxied || props.unoptimized} />;
}

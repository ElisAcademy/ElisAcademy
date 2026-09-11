export function repeatForCarousel<T>(items: readonly T[], minimumCards: number): T[] {
    if (!items.length) return [];

    return Array.from({ length: Math.ceil(minimumCards / items.length) }, () => items).flat();
}

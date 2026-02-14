export function getYouTubeId(url: string | undefined): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
}

export function getVimeoId(url: string | undefined): string | null {
    if (!url) return null;
    const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
    return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string | undefined, quality: 'maxres' | 'hq' = 'hq'): string | null {
    const id = getYouTubeId(url);
    if (!id) return null;
    if (quality === 'maxres') return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

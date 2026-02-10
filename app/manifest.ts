import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Cielito's Wrld - Photography Portfolio",
        short_name: "Cielito's Wrld",
        description: "Visual stories & creative photography by Cielito",
        start_url: "/",
        display: 'standalone',
        background_color: '#F7F3E8',
        theme_color: '#C86B42',
        icons: [
            {
                src: '/icon-192.png', // Next.js auto-generates this from app/icon.png
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png', // Next.js auto-generates this from app/icon.png
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}

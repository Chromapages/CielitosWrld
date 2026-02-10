'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface Track {
    title: string;
    artist: string;
    url: string;
    mood?: string;
}

interface MusicContextType {
    isPlaying: boolean;
    currentTrack: Track | null;
    playlist: Track[];
    isPlayerVisible: boolean;
    togglePlay: () => void;
    playTrack: (track: Track) => void;
    setPlaylist: (tracks: Track[]) => void;
    setIsPlayerVisible: (visible: boolean) => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children, initialPlaylist = [] }: { children: React.ReactNode, initialPlaylist?: Track[] }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState<Track[]>(initialPlaylist);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(initialPlaylist[0] || null); // Default to first track
    const [isPlayerVisible, setIsPlayerVisible] = useState(false); // Hidden by default until interacting

    // Update effect to handle initial playlist changes if data comes in later
    useEffect(() => {
        if (initialPlaylist.length > 0 && playlist.length === 0) {
            setPlaylist(initialPlaylist);
            if (!currentTrack) {
                setCurrentTrack(initialPlaylist[0]);
            }
        }
    }, [initialPlaylist, playlist.length, currentTrack]);

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
        if (!isPlayerVisible) setIsPlayerVisible(true);
    };

    const playTrack = (track: Track) => {
        if (currentTrack?.url === track.url) {
            togglePlay();
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
        }
        setIsPlayerVisible(true);
    };

    const nextTrack = () => {
        if (!currentTrack || playlist.length === 0) return;
        const currentIndex = playlist.findIndex(t => t.url === currentTrack.url);
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentTrack(playlist[nextIndex]);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        if (!currentTrack || playlist.length === 0) return;
        const currentIndex = playlist.findIndex(t => t.url === currentTrack.url);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrack(playlist[prevIndex]);
        setIsPlaying(true);
    };

    return (
        <MusicContext.Provider value={{
            isPlaying,
            currentTrack,
            playlist,
            isPlayerVisible,
            togglePlay,
            playTrack,
            setPlaylist,
            setIsPlayerVisible,
            nextTrack,
            prevTrack
        }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}

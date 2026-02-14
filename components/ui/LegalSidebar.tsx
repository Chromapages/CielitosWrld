'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
    id: string;
    label: string;
}

interface LegalSidebarProps {
    items: TocItem[];
}

export const LegalSidebar = ({ items }: LegalSidebarProps) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0,
            }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 96;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav className="hidden lg:block sticky top-24 space-y-1">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-10 px-6">
                On This Page
            </h4>
            <ul className="space-y-4">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className={cn(
                                'group flex items-start w-full text-left py-3 px-6 text-[13px] font-medium transition-all duration-300 border-l-2',
                                activeId === item.id
                                    ? 'border-orange-500 text-stone-900 dark:text-white bg-orange-500/10'
                                    : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-400 dark:hover:border-stone-600'
                            )}
                        >
                            <span className="leading-snug">{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

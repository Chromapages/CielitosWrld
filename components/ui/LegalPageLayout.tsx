'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LegalSidebar } from './LegalSidebar';

interface TocItem {
    id: string;
    label: string;
}

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    toc: TocItem[];
    children: React.ReactNode;
}

export const LegalPageLayout = ({ title, lastUpdated, toc, children }: LegalPageLayoutProps) => {
    return (
        <main className="min-h-screen relative bg-stone-50 dark:bg-stone-950">
            <div className="container mx-auto px-6 max-w-7xl pt-16">

                <header className="mb-16 border-b border-stone-200 dark:border-stone-800 pb-12">
                    <h1 className="hidden md:block font-pattaya text-5xl md:text-7xl text-stone-900 dark:text-stone-50 mb-6">
                        {title}
                    </h1>
                    <p className="hidden md:block text-stone-500 dark:text-stone-400 text-sm uppercase tracking-widest font-medium">
                        Last Updated: {lastUpdated}
                    </p>
                </header>

                <div className="grid lg:grid-cols-[280px_1fr] gap-12 pb-24">
                    <aside className="hidden lg:block">
                        <LegalSidebar items={toc} />
                    </aside>

                    <article className="prose prose-stone dark:prose-invert prose-lg max-w-none 
                        prose-headings:font-pattaya prose-headings:font-normal prose-headings:tracking-normal
                        prose-headings:leading-[0.9] prose-headings:!mb-12
                        prose-h2:text-4xl md:prose-h2:text-6xl prose-h2:!mt-32 md:prose-h2:!mt-48
                        prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:!mt-20
                        prose-headings:scroll-mt-40
                        prose-p:text-stone-600 dark:prose-p:text-stone-400 prose-p:!leading-[1.9] prose-p:!mb-12
                        prose-li:text-stone-600 dark:prose-li:text-stone-400 prose-li:!my-6
                        prose-strong:text-stone-900 dark:prose-strong:text-stone-100
                        prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
                    ">
                        {children}
                    </article>
                </div>

                <footer className="mt-24 pt-12 border-t border-stone-200 dark:border-stone-800 pb-24">
                    <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 md:p-12 text-center shadow-sm">
                        <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">Have questions about our policies?</h3>
                        <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-md mx-auto">
                            If you have any questions or concerns regarding our {title.toLowerCase()}, please don't hesitate to reach out.
                        </p>
                        <a
                            href="mailto:Abajo.Del.Cieloo@gmail.com"
                            className="inline-flex items-center px-8 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium transition-transform hover:scale-105"
                        >
                            Contact Support
                        </a>
                    </div>
                </footer>
            </div>
        </main>
    );
};

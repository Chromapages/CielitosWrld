'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!items || items.length === 0) return null;

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 md:py-24 bg-stone-100 dark:bg-stone-900">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4">
                        <HelpCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="font-pattaya text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-stone-600 dark:text-stone-400 text-lg">
                        Common questions about sessions, booking, and delivery.
                    </p>
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-bold text-lg text-stone-900 dark:text-stone-100 pr-8">
                                    {item.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="p-6 pt-0 text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-700/50 mt-2">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

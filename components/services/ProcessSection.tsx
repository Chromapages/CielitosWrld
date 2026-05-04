import { MessageSquare, Phone, Camera, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProcessStep } from "@/types/services";
import { MobileSection } from "../layout/MobileSection";

interface ProcessSectionProps {
    steps: ProcessStep[];
}

export default function ProcessSection({ steps }: ProcessSectionProps) {
    return (
        <MobileSection className="bg-brand-50 dark:bg-brand-950 border-t border-brand-100 dark:border-brand-800" hasGutter={true}>
            <div className="max-w-[1200px] mx-auto lg:flex lg:gap-16">

                    {/* Left Column - Sticky Title & Progress */}
                    <div className="lg:w-[33%] lg:sticky lg:top-32 lg:self-start mb-12 lg:mb-0">
                        <div className="opacity-0 animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-forwards motion-reduce:animate-none motion-reduce:opacity-100">
                            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                The Process
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-pattaya italic mb-4 text-brand-900 dark:text-white">
                                How It Works
                            </h2>
                            <p className="text-brand-500 dark:text-brand-400 text-lg mb-8 max-w-sm">
                                A seamless journey from your first message to stunning final images.
                            </p>

                            {/* Progress Indicator - Desktop Only */}
                            <div className="hidden lg:flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    <span className="text-brand-600 dark:text-brand-400">{steps.length} steps to perfection</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-brand-300 dark:bg-brand-600"></div>
                                    <span className="text-brand-600 dark:text-brand-400">Typically 2-4 weeks turnaround</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-brand-300 dark:bg-brand-600"></div>
                                    <span className="text-brand-600 dark:text-brand-400">100% satisfaction guaranteed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Process Cards */}
                    <div className="lg:w-[66%] relative">
                        {/* Vertical Progress Line - Desktop */}
                        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-200 via-orange-500/50 to-brand-200 dark:from-brand-800 dark:via-orange-500/30 dark:to-brand-800"></div>

                        {/* Horizontal Progress Line - Mobile */}
                        <div className="lg:hidden absolute left-0 right-0 top-8 h-px bg-brand-200 dark:bg-brand-800"></div>

                        <div className="space-y-8 lg:space-y-12">
                            {steps.map((step: ProcessStep, i: number) => {
                                const icons = [MessageSquare, Phone, Camera, Sparkles];
                                const Icon = icons[i] || Sparkles;
                                const stepNumber = String(i + 1).padStart(2, '0');

                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "relative pl-0 lg:pl-20 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards motion-reduce:animate-none motion-reduce:opacity-100",
                                            `stagger-${i + 1}`
                                        )}
                                    >
                                        {/* Step Number Badge - Desktop */}
                                        <div className="hidden lg:flex absolute left-0 top-7 w-16 h-16 rounded-2xl bg-white dark:bg-brand-900 border border-brand-200 dark:border-brand-800 items-center justify-center shadow-lg z-10">
                                            <span className="text-2xl font-bold text-brand-300 dark:text-brand-600 font-archivo">
                                                {stepNumber}
                                            </span>
                                        </div>

                                        {/* Card */}
                                        <div className="group bg-white/80 dark:bg-brand-900/80 backdrop-blur-md rounded-3xl p-8 border border-brand-200/50 dark:border-brand-800/50 shadow-lg shadow-brand-200/20 dark:shadow-black/20 hover:shadow-xl hover:shadow-brand-300/30 dark:hover:shadow-orange-900/10 transition-all duration-500 hover:-translate-y-1">
                                            <div className="flex items-start gap-6">
                                                {/* Icon */}
                                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        {/* Mobile Step Number */}
                                                        <span className="lg:hidden text-sm font-bold text-orange-500">{stepNumber}</span>
                                                        <h3 className="text-xl font-bold font-archivo text-brand-900 dark:text-white">{step.title}</h3>
                                                    </div>
                                                    <p className="text-brand-600 dark:text-brand-400 leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Decorative gradient accent */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
        </MobileSection>
    );
}

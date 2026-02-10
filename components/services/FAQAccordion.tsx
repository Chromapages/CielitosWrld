import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types/services";

interface FAQAccordionProps {
    faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    return (
        <section className="py-24 bg-brand-50 dark:bg-brand-950 border-t border-brand-200 dark:border-brand-800">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-archivo mb-4">Frequently Asked Questions</h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq: FAQ, i: number) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="bg-white dark:bg-brand-900 px-6 rounded-2xl border border-brand-100 dark:border-brand-800 data-[state=open]:border-orange-200 dark:data-[state=open]:border-orange-900/30 data-[state=open]:shadow-lg data-[state=open]:shadow-orange-500/5 transition-all duration-300"
                        >
                            <AccordionTrigger className="hover:no-underline py-6 font-medium text-left [&[data-state=open]>svg]:rotate-180">
                                <span className="flex items-center gap-3">
                                    {i < 2 && (
                                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full shrink-0">
                                            Most Asked
                                        </span>
                                    )}
                                    {faq.question}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-brand-500 dark:text-brand-400 pb-6 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

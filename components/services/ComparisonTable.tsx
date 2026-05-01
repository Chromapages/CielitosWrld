import { Check } from "lucide-react";
import { ServicePackage } from "@/types/services";
import { MobileSection } from "../layout/MobileSection";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
    packages: ServicePackage[];
}

export default function ComparisonTable({ packages }: ComparisonTableProps) {
    if (!packages || packages.length === 0) return null;

    // Helper to extract feature values from the string array
    const getFeatureValue = (pkg: ServicePackage, keyword: string, isBinary: boolean = false) => {
        const feature = pkg.features.find(f => f.toLowerCase().includes(keyword.toLowerCase()));
        
        if (isBinary) {
            return feature ? true : false;
        }
        
        return feature || "—";
    };

    const categories = [
        { label: "Session Hours", keyword: "hour" },
        { label: "High-Res Edits", keyword: "edit" },
        { label: "Locations", keyword: "location" },
        { label: "Outfit Changes", keyword: "outfit" },
        { label: "Creative Direction", keyword: "creative direction", isBinary: true },
        { label: "Styling", keyword: "styling", isBinary: true },
        { label: "Social Media Strategy", keyword: "strategy", isBinary: true },
    ];

    return (
        <MobileSection className="border-b border-brand-100 dark:border-brand-900/50">
            <h2 className="text-center text-4xl md:text-5xl font-archivo font-bold tracking-tight mb-20 text-brand-950 dark:text-white">
                Compare Packages
            </h2>
                
                <p className="text-xs text-stone-400 text-right mb-2 md:hidden">Scroll to compare →</p>
                <div className="relative max-w-[1200px] mx-auto">
                  <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-stone-950 to-transparent z-10 pointer-events-none md:hidden" />
                  <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <th className="pb-8 font-medium text-brand-400 text-sm tracking-wide uppercase">
                                    Features
                                </th>
                                {packages.map((pkg) => (
                                    <th 
                                        key={pkg._id} 
                                        className={cn(
                                            "pb-8 px-6 text-center text-lg md:text-xl font-bold tracking-tight",
                                            pkg.popular 
                                                ? "text-orange-600 dark:text-orange-400" 
                                                : "text-brand-900 dark:text-white"
                                        )}
                                    >
                                        {pkg.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50 dark:divide-brand-900/30">
                            {categories.map((cat) => (
                                <tr key={cat.label} className="group hover:bg-brand-50/50 dark:hover:bg-brand-900/10 transition-colors">
                                    <td className="py-6 pr-4 text-brand-500 dark:text-brand-400 font-normal text-[15px] md:text-base tracking-normal">
                                        {cat.label}
                                    </td>
                                    {packages.map((pkg) => {
                                        const value = getFeatureValue(pkg, cat.keyword, cat.isBinary);
                                        const isPopular = pkg.popular;
                                        
                                        return (
                                            <td 
                                                key={`${pkg._id}-${cat.label}`}
                                                className={cn(
                                                    "py-6 px-6 text-center text-[15px] md:text-base transition-all",
                                                    isPopular ? "font-semibold text-brand-950 dark:text-brand-50" : "text-brand-800 dark:text-brand-200"
                                                )}
                                            >
                                                {cat.isBinary ? (
                                                    value ? (
                                                        <div className="flex justify-center">
                                                            <Check 
                                                                className={cn(
                                                                    "w-5 h-5 stroke-[2.5px]",
                                                                    isPopular ? "text-orange-500" : "text-brand-400/80 dark:text-brand-600"
                                                                )} 
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-brand-200 dark:text-brand-800 font-light">—</span>
                                                    )
                                                ) : (
                                                    value
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 text-center text-brand-400 dark:text-brand-500 text-sm font-light">
                    * Custom packages and add-ons are available upon request.
                </div>
        </MobileSection>
    );
}

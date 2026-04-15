import { Check } from "lucide-react";
import { ServicePackage } from "@/types/services";

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
        
        // For quantitative features, clean up common prefixes/suffixes if needed 
        // but generally we want to display the full descriptive string from Sanity.
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
        <div className="mt-16 pt-12">
            <h3 className="text-center text-3xl md:text-4xl font-bold font-archivo mb-12 text-brand-900 dark:text-white">Compare Packages</h3>
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-brand-200 dark:border-brand-800">
                                <th className="text-left py-4 px-4 font-medium text-brand-500">Features</th>
                                {packages.map((pkg, idx) => (
                                    <th 
                                        key={pkg._id} 
                                        className={`text-center py-4 px-4 font-bold ${
                                            idx === 1 ? "text-orange-600" : "text-brand-900 dark:text-white"
                                        }`}
                                    >
                                        {pkg.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, catIdx) => (
                                <tr 
                                    key={cat.label}
                                    className={`border-b border-brand-100 dark:border-brand-800 ${
                                        catIdx === categories.length - 1 ? "border-0" : ""
                                    }`}
                                >
                                    <td className="py-4 px-4 text-brand-600 dark:text-brand-400">{cat.label}</td>
                                    {packages.map((pkg, idx) => {
                                        const value = getFeatureValue(pkg, cat.keyword, cat.isBinary);
                                        
                                        return (
                                            <td 
                                                key={`${pkg._id}-${cat.label}`}
                                                className={`text-center py-4 px-4 ${
                                                    idx === 1 ? "font-medium" : ""
                                                }`}
                                            >
                                                {cat.isBinary ? (
                                                    value ? (
                                                        <Check className={`w-5 h-5 mx-auto ${idx === 1 ? "text-orange-500" : "text-brand-500"}`} />
                                                    ) : (
                                                        <span className="text-brand-300 dark:text-brand-700">—</span>
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
        </div>
    );
}


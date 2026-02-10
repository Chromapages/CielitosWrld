import { Check } from "lucide-react";
import { ServicePackage } from "@/types/services";

interface ComparisonTableProps {
    packages: ServicePackage[];
}

export default function ComparisonTable({ packages }: ComparisonTableProps) {
    return (
        <div className="mt-16 pt-12">
            <h3 className="text-center text-3xl md:text-4xl font-bold font-archivo mb-12 text-brand-900 dark:text-white">Compare Packages</h3>
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-brand-200 dark:border-brand-800">
                                <th className="text-left py-4 px-4 font-medium text-brand-500">Features</th>
                                <th className="text-center py-4 px-4 font-bold text-brand-900 dark:text-white">Essential</th>
                                <th className="text-center py-4 px-4 font-bold text-orange-600">Signature</th>
                                <th className="text-center py-4 px-4 font-bold text-brand-900 dark:text-white">Branding</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">Session Hours</td>
                                <td className="text-center py-4 px-4">1 hour</td>
                                <td className="text-center py-4 px-4 font-medium">2 hours</td>
                                <td className="text-center py-4 px-4">4 hours</td>
                            </tr>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">High-Res Edits</td>
                                <td className="text-center py-4 px-4">15</td>
                                <td className="text-center py-4 px-4 font-medium">35</td>
                                <td className="text-center py-4 px-4">80+</td>
                            </tr>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">Locations</td>
                                <td className="text-center py-4 px-4">1</td>
                                <td className="text-center py-4 px-4 font-medium">2</td>
                                <td className="text-center py-4 px-4">Multiple</td>
                            </tr>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">Outfit Changes</td>
                                <td className="text-center py-4 px-4">2</td>
                                <td className="text-center py-4 px-4 font-medium">3</td>
                                <td className="text-center py-4 px-4">Unlimited</td>
                            </tr>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">Creative Direction</td>
                                <td className="text-center py-4 px-4"><span className="text-brand-300">—</span></td>
                                <td className="text-center py-4 px-4 text-orange-500"><Check className="w-5 h-5 mx-auto" /></td>
                                <td className="text-center py-4 px-4 text-orange-500"><Check className="w-5 h-5 mx-auto" /></td>
                            </tr>
                            <tr className="border-b border-brand-100 dark:border-brand-800">
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">Styling</td>
                                <td className="text-center py-4 px-4"><span className="text-brand-300">—</span></td>
                                <td className="text-center py-4 px-4"><span className="text-brand-300">—</span></td>
                                <td className="text-center py-4 px-4 text-orange-500"><Check className="w-5 h-5 mx-auto" /></td>
                            </tr>
                            <tr>
                                <td className="py-4 px-4 text-brand-600 dark:text-brand-400">Social Media Strategy</td>
                                <td className="text-center py-4 px-4"><span className="text-brand-300">—</span></td>
                                <td className="text-center py-4 px-4"><span className="text-brand-300">—</span></td>
                                <td className="text-center py-4 px-4 text-orange-500"><Check className="w-5 h-5 mx-auto" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

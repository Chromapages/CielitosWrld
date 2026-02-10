import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Cielito\'s World',
    description: 'Privacy Policy',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold mb-6 font-display">Privacy Policy</h1>
            <p className="text-stone-600 dark:text-stone-400 max-w-lg mb-8">
                We value your privacy. This policy is currently being updated to reflect our commitment to protecting your data.
            </p>
            <p className="text-sm text-stone-500">
                For inquiries, please contact Abajo.Del.Cieloo@gmail.com
            </p>
        </div>
    );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - Cielito\'s World',
    description: 'Terms of Service',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold mb-6 font-display">Terms of Service</h1>
            <p className="text-stone-600 dark:text-stone-400 max-w-lg mb-8">
                These terms outline the rules and regulations for the use of Cielito's World website. The full document is coming soon.
            </p>
            <p className="text-sm text-stone-500">
                For inquiries, please contact Abajo.Del.Cieloo@gmail.com
            </p>
        </div>
    );
}

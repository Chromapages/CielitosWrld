import { Metadata } from 'next';
import { Mail, Phone, MapPin, Instagram, AtSign, Linkedin } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import FAQ from '@/components/contact/FAQ';
import { client } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries';
import PageBackground from '@/components/ui/PageBackground';

export const metadata: Metadata = {
  title: 'Contact - Cielito\'s World',
  description: 'Get in touch with Cielito for photography sessions, collaborations, or just to say hello. Based in Los Angeles, CA.',
};

export const revalidate = 60;

export default async function Contact() {
  let data: any = {};
  try {
    data = await client.fetch(CONTACT_PAGE_QUERY) || {};
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    // Fallback to empty object to use defaults
  }

  const {
    title = "Let's Connect",
    introText = "Have a project in mind, a question, or just want to say hello? I'd love to hear from you.",
    email = "Abajo.Del.Cieloo@gmail.com",
    location = "Southern California, USA",
    socialLinks: rawSocialLinks,
    faqs: rawFaqs,
    studioLabel = "Studio",
    emailLabel = "Email",
    phoneLabel = "Phone",
    followMeLabel = "Follow Me"
  } = data || {};

  // Handle phone separately to catch null values (Sanity returns null for empty fields)
  const phone = data?.phone || "(951) 563-2759";

  const socialLinks = rawSocialLinks || {};
  const faqs = rawFaqs || [];

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Background Image */}
      {data?.pageBackground && (
        <PageBackground image={data.pageBackground} />
      )}

      <main className="relative flex-grow -mt-8 z-10">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
          {/* Left Sidebar - Contact Info */}
          <div className="relative flex-1 lg:w-2/5 p-8 sm:p-12 md:p-16 flex flex-col lg:justify-center bg-stone-50 dark:bg-stone-900 z-0 min-h-[400px]">
            <div className="max-w-md lg:ml-auto lg:mr-0 text-stone-800 dark:text-stone-100">
              <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
                {title}
              </h1>
              <p className="text-lg font-normal leading-relaxed text-stone-600 dark:text-stone-400 mb-10">
                {introText}
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800 shrink-0 size-12 text-orange-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400">{emailLabel}</p>
                    <a
                      className="text-lg font-semibold text-stone-800 dark:text-stone-200 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800 shrink-0 size-12 text-orange-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400">{phoneLabel}</p>
                    <a
                      className="text-lg font-semibold text-stone-800 dark:text-stone-200 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                      href={`tel:${phone}`}
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Studio Location */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800 shrink-0 size-12 text-orange-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400">{studioLabel}</p>
                    <p className="text-lg font-semibold text-stone-800 dark:text-stone-200">{location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-stone-300 dark:border-stone-700">
                <p className="text-sm font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-4">{followMeLabel}</p>
                <div className="flex items-center gap-5">
                  <a
                    className="text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                    href={socialLinks.instagram || "https://www.instagram.com/cielitos.wrld/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-7 h-7" />
                  </a>
                  {socialLinks.tiktok && (
                    <a
                      className="text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    >
                      <span className="font-bold text-xl">TT</span>
                    </a>
                  )}
                  <a
                    className="text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                    href={socialLinks.threads || "https://www.threads.net/@cielitos.wrld"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Threads"
                  >
                    <AtSign className="w-7 h-7" />
                  </a>
                  {socialLinks.linkedin && (
                    <a
                      className="text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-7 h-7" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative flex-1 lg:w-3/5 p-8 sm:p-12 md:p-16 flex flex-col bg-white dark:bg-stone-950 shadow-2xl z-10 lg:justify-center min-h-[500px]">
            <div className="max-w-lg mx-auto lg:mr-auto lg:ml-0 w-full text-stone-800 dark:text-stone-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      {faqs.length > 0 && <FAQ items={faqs} />}
    </div>
  );
}
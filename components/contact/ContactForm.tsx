'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', budget: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-stone-700 dark:text-stone-300 mb-8 leading-relaxed max-w-md mx-auto">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors underline underline-offset-4"
            tabIndex={0}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-4xl font-bold tracking-tight mb-8">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 placeholder:text-black dark:placeholder:text-stone-500 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 placeholder:text-black dark:placeholder:text-stone-500 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Budget Field */}
        <div>
          <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="budget">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300"
          >
            <option value="" className="text-black dark:text-stone-900">Select Budget Range</option>
            <option value="200-300" className="dark:text-stone-900">$200 - $300</option>
            <option value="500-1000" className="dark:text-stone-900">$500 - $1,000</option>
            <option value="1000-2500" className="dark:text-stone-900">$1,000 - $2,500</option>
            <option value="2500-5000" className="dark:text-stone-900">$2,500 - $5,000</option>
            <option value="5000-10000" className="dark:text-stone-900">$5,000 - $10,000</option>
            <option value="10000+" className="dark:text-stone-900">$10,000+</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Your Message..."
            className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 placeholder:text-black dark:placeholder:text-stone-500 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-lg border-2 border-orange-600 px-8 py-4 text-lg font-extrabold leading-6 text-orange-600 hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
    </>
  );
}
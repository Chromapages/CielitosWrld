'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { motion } from 'framer-motion';
import { Quote, ZoomIn } from 'lucide-react';

interface EnhancedPortableTextProps {
  value: any[];
}

export function EnhancedPortableText({ value }: EnhancedPortableTextProps) {
  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
          className="font-heading text-[28px] md:text-[36px] font-bold text-zinc-900 dark:text-white leading-tight mt-16 mb-6 scroll-mt-24"
        >
          {children}
        </motion.h2>
      ),
      h3: ({ children }) => (
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
          className="font-heading text-[22px] md:text-[28px] font-bold text-zinc-900 dark:text-white leading-snug mt-12 mb-4 scroll-mt-24"
        >
          {children}
        </motion.h3>
      ),
      h4: ({ children }) => (
        <motion.h4 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-heading text-[18px] md:text-[22px] font-bold text-zinc-900 dark:text-white leading-snug mt-10 mb-4"
        >
          {children}
        </motion.h4>
      ),
      normal: ({ children }) => (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="font-body text-[18px] md:text-[20px] text-zinc-700 dark:text-zinc-300 leading-[1.75] mb-6"
        >
          {children}
        </motion.p>
      ),
      blockquote: ({ children }) => (
        <motion.blockquote 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative my-12 py-8 px-6 md:px-10 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl border-l-4 border-[#EC4899]"
        >
          <Quote className="absolute top-4 left-4 w-8 h-8 text-[#EC4899]/20" />
          <p className="font-heading text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed italic relative z-10">
            {children}
          </p>
        </motion.blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <motion.ul 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="list-disc pl-6 mb-6 space-y-2 font-body text-[18px] md:text-[20px] text-zinc-700 dark:text-zinc-300 leading-[1.75]"
        >
          {children}
        </motion.ul>
      ),
      number: ({ children }) => (
        <motion.ol 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="list-decimal pl-6 mb-6 space-y-2 font-body text-[18px] md:text-[20px] text-zinc-700 dark:text-zinc-300 leading-[1.75]"
        >
          {children}
        </motion.ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="pl-2 marker:text-[#EC4899]">{children}</li>
      ),
      number: ({ children }) => (
        <li className="pl-2">{children}</li>
      ),
    },
    types: {
      image: ({ value }) => {
        const imageUrl = value?.asset ? urlFor(value).width(1200).url() : null;
        const alt = value?.alt || 'Blog image';
        const caption = value?.caption;
        
        if (!imageUrl) return null;
        
        return (
          <motion.figure 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="my-10 -mx-4 sm:mx-0 group"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-lg">
              <Image
                src={imageUrl}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              {/* Hover Zoom Indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                  <ZoomIn className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            {caption && (
              <figcaption className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400 font-body">
                {caption}
              </figcaption>
            )}
          </motion.figure>
        );
      },
      code: ({ value }) => {
        const { code, language, filename } = value;
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-8 rounded-xl overflow-hidden bg-[#18181b] shadow-lg"
          >
            {filename && (
              <div className="px-4 py-2 bg-[#27272a] border-b border-zinc-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-zinc-400 ml-2">{filename}</span>
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-zinc-100 leading-relaxed">
                {code}
              </code>
            </pre>
          </motion.div>
        );
      },
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-zinc-900 dark:text-white">
          {children}
        </strong>
      ),
      em: ({ children }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }) => (
        <code className="font-mono text-sm bg-zinc-100 dark:bg-zinc-800 text-[#EC4899] dark:text-[#f472b6] px-1.5 py-0.5 rounded">
          {children}
        </code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#EC4899] hover:text-[#DB2777] underline underline-offset-4 transition-colors font-medium"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="prose-reading">
      <PortableText value={value} components={components} />
    </div>
  );
}

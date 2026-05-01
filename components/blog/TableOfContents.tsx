'use client';

import { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content?: any;
  className?: string;
}

export default function TableOfContents({ content, className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Extract headings from Portable Text content
  useEffect(() => {
    if (!content || !Array.isArray(content)) {
      setIsVisible(false);
      return;
    }

    const extractedHeadings: TOCItem[] = [];
    let headingIndex = 0;

    content.forEach((block: any) => {
      if (block._type === 'block' && block.style) {
        // Check for h2 or h3 styles
        if (block.style === 'h2' || block.style === 'h3') {
          const text = block.children?.map((child: any) => child.text).join('') || '';
          if (text.trim()) {
            const id = `heading-${headingIndex++}`;
            extractedHeadings.push({
              id,
              text: text.trim(),
              level: block.style === 'h2' ? 2 : 3
            });
          }
        }
      }
    });

    setHeadings(extractedHeadings);
    setIsVisible(extractedHeadings.length >= 3); // Only show if 3+ headings
  }, [content]);

  // Add IDs to actual headings in the DOM and track active section
  useEffect(() => {
    if (headings.length === 0) return;

    // Add IDs to headings
    const article = document.querySelector('article, .prose, [class*="prose"]');
    if (article) {
      const domHeadings = article.querySelectorAll('h2, h3');
      domHeadings.forEach((heading, index) => {
        if (headings[index]) {
          heading.id = headings[index].id;
        }
      });
    }

    // Track active heading on scroll
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h2[id], h3[id]');
      let currentActive = '';

      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          currentActive = heading.id;
        }
      });

      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      });
    }
  };

  if (!isVisible || headings.length === 0) return null;

  return (
    <nav
      className={`bg-white dark:bg-brand-900 rounded-2xl border border-brand-100 dark:border-brand-800 shadow-sm overflow-hidden ${className}`}
      aria-label="Table of contents"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-orange-600" />
          <span className="font-bold text-sm text-brand-800 dark:text-brand-200">Table of Contents</span>
          <span className="text-xs text-brand-400 dark:text-brand-500 bg-brand-100 dark:bg-brand-800/50 px-2 py-0.5 rounded-full">
            {headings.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-brand-400 dark:text-brand-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-brand-400 dark:text-brand-500" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-2 pb-3">
          <ul className="space-y-1">
            {headings.map((heading, index) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${activeId === heading.id
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium'
                      : 'text-brand-600 dark:text-brand-300 hover:bg-white/40 dark:hover:bg-white/10 hover:text-brand-800 dark:hover:text-brand-100'
                    } ${heading.level === 3 ? 'pl-6 text-xs' : ''
                    }`}
                >
                  <span className="flex items-start gap-2">
                    <span className="text-brand-300 dark:text-brand-600 font-mono text-xs mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="line-clamp-2">{heading.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

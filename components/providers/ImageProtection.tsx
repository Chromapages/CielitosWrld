'use client';

import { useEffect } from 'react';

// Checks if the right-clicked element is an image or overlaps one.
// Next.js <Image> wraps <img> in a <span>, so gallery overlay divs (absolute
// siblings of that span) also need to be caught — hence the :has() checks.
function isImageTarget(el: HTMLElement): boolean {
  if (el.tagName === 'IMG') return true;
  return !!el.closest(':has(> img), :has(> span > img)');
}

export default function ImageProtection() {
  useEffect(() => {
    const blockContext = (e: MouseEvent) => {
      if (isImageTarget(e.target as HTMLElement)) e.preventDefault();
    };

    const blockDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault();
    };

    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('dragstart', blockDrag);

    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('dragstart', blockDrag);
    };
  }, []);

  return null;
}

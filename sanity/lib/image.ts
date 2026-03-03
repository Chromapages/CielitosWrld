import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export const sanityLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  try {
    const url = new URL(src);
    if (url.hostname === 'cdn.sanity.io') {
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'max');
      url.searchParams.set('w', width.toString());
      if (quality) url.searchParams.set('q', quality.toString());
      return url.href;
    }
  } catch (e) {
    // Return original src if parsing fails
  }
  return src;
};

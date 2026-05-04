import { z } from 'zod';

/**
 * Valid gallery category slugs (kebab-case).
 * Maps to Sanity field values:
 *   portraits         → "Portraits"
 *   couples           → "Couples"
 *   events           → "Events"
 *   music-and-artists → "Music & Artists"
 *   brands            → "Brands"
 *   personal          → "Personal"
 */
export const VALID_CATEGORY_SLUGS = [
  'portraits',
  'couples',
  'events',
  'music-and-artists',
  'brands',
  'personal',
] as const;

export const CategorySlugSchema = z.enum(VALID_CATEGORY_SLUGS);
export type CategorySlug = z.infer<typeof CategorySlugSchema>;

/**
 * Maps a category slug to its Sanity display value.
 */
export const CATEGORY_SLUG_TO_VALUE: Record<CategorySlug, string> = {
  portraits: 'Portraits',
  couples: 'Couples',
  events: 'Events',
  'music-and-artists': 'Music & Artists',
  brands: 'Brands',
  personal: 'Personal',
} as const;

/**
 * Maps a Sanity category value to its slug.
 */
export const CATEGORY_VALUE_TO_SLUG: Record<string, CategorySlug> = {
  Portraits: 'portraits',
  Couples: 'couples',
  Events: 'events',
  'Music & Artists': 'music-and-artists',
  Brands: 'brands',
  Personal: 'personal',
} as const;

/**
 * Validates a category slug and returns it, or null if invalid.
 */
export function validateCategorySlug(slug: string): CategorySlug | null {
  const result = CategorySlugSchema.safeParse(slug);
  return result.success ? result.data : null;
}
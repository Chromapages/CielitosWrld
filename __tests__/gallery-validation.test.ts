import { describe, it, expect } from 'vitest';
import {
  VALID_CATEGORY_SLUGS,
  CategorySlugSchema,
  validateCategorySlug,
  CATEGORY_SLUG_TO_VALUE,
  CATEGORY_VALUE_TO_SLUG,
} from '@/lib/validations/gallery';

describe('gallery category validation', () => {
  describe('VALID_CATEGORY_SLUGS', () => {
    it('contains all 6 expected category slugs', () => {
      expect(VALID_CATEGORY_SLUGS).toHaveLength(6);
      expect(VALID_CATEGORY_SLUGS).toContain('portraits');
      expect(VALID_CATEGORY_SLUGS).toContain('couples');
      expect(VALID_CATEGORY_SLUGS).toContain('events');
      expect(VALID_CATEGORY_SLUGS).toContain('music-and-artists');
      expect(VALID_CATEGORY_SLUGS).toContain('brands');
      expect(VALID_CATEGORY_SLUGS).toContain('personal');
    });

    it('slugs are all lowercase kebab-case', () => {
      VALID_CATEGORY_SLUGS.forEach((slug) => {
        expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      });
    });
  });

  describe('CategorySlugSchema', () => {
    it('parses valid slugs successfully', () => {
      VALID_CATEGORY_SLUGS.forEach((slug) => {
        const result = CategorySlugSchema.safeParse(slug);
        expect(result.success).toBe(true);
      });
    });

    it('rejects invalid slugs', () => {
      const invalid = [
        'portrait', // singular
        'music_artists', // underscore
        'Music & Artists', // full name
        '123', // numbers only
        '', // empty
        'portraits-events', // combined
        'PORTRAITS', // uppercase
      ];
      invalid.forEach((slug) => {
        const result = CategorySlugSchema.safeParse(slug);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('validateCategorySlug', () => {
    it('returns the slug when valid', () => {
      VALID_CATEGORY_SLUGS.forEach((slug) => {
        expect(validateCategorySlug(slug)).toBe(slug);
      });
    });

    it('returns null for invalid slugs', () => {
      expect(validateCategorySlug('invalid')).toBeNull();
      expect(validateCategorySlug('')).toBeNull();
      expect(validateCategorySlug('portrait')).toBeNull();
    });
  });

  describe('CATEGORY_SLUG_TO_VALUE', () => {
    it('maps all slugs to human-readable values', () => {
      expect(CATEGORY_SLUG_TO_VALUE.portraits).toBe('Portraits');
      expect(CATEGORY_SLUG_TO_VALUE.couples).toBe('Couples');
      expect(CATEGORY_SLUG_TO_VALUE.events).toBe('Events');
      expect(CATEGORY_SLUG_TO_VALUE['music-and-artists']).toBe('Music & Artists');
      expect(CATEGORY_SLUG_TO_VALUE.brands).toBe('Brands');
      expect(CATEGORY_SLUG_TO_VALUE.personal).toBe('Personal');
    });
  });

  describe('CATEGORY_VALUE_TO_SLUG', () => {
    it('maps human-readable values back to slugs', () => {
      expect(CATEGORY_VALUE_TO_SLUG['Portraits']).toBe('portraits');
      expect(CATEGORY_VALUE_TO_SLUG['Couples']).toBe('couples');
      expect(CATEGORY_VALUE_TO_SLUG['Events']).toBe('events');
      expect(CATEGORY_VALUE_TO_SLUG['Music & Artists']).toBe('music-and-artists');
      expect(CATEGORY_VALUE_TO_SLUG['Brands']).toBe('brands');
      expect(CATEGORY_VALUE_TO_SLUG['Personal']).toBe('personal');
    });
  });

  describe('round-trip: slug -> value -> slug', () => {
    it('preserves slug through value conversion and back', () => {
      (Object.keys(CATEGORY_SLUG_TO_VALUE) as (keyof typeof CATEGORY_SLUG_TO_VALUE)[]).forEach((slug) => {
        const value = CATEGORY_SLUG_TO_VALUE[slug];
        const roundTripped = CATEGORY_VALUE_TO_SLUG[value];
        expect(roundTripped).toBe(slug);
      });
    });
  });
});
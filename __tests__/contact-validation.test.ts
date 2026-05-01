import { contactFormSchema } from '@/lib/validations/contact';
import { describe, it, expect } from 'vitest';

describe('Contact Form Validation', () => {
  it('should validate a correct payload', () => {
    const payload = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a long enough message for testing.',
      budget: '$5k - $10k',
    };
    const result = contactFormSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid email', () => {
    const payload = {
      name: 'John Doe',
      email: 'not-an-email',
      message: 'This is a long enough message for testing.',
    };
    const result = contactFormSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it('should fail on short message', () => {
    const payload = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Too short',
    };
    const result = contactFormSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });
});

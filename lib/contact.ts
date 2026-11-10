import { z } from 'zod';

export const CONTACT_BUDGET_OPTIONS = [
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2500', label: '$1,000 - $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000+', label: '$10,000+' },
] as const;

const fieldMessages = {
  name: 'Enter a name between 2 and 100 characters.',
  email: 'Enter a valid email address.',
  budget: 'Choose a budget range.',
  message: 'Enter a message between 10 and 5,000 characters.',
} as const;

const uuidSchema = z.string().uuid().transform(value => value.toLowerCase());
const responseIdSchema = z.string().uuid().refine(value => value === value.toLowerCase());

export const contactSubmissionSchema = z.object({
  submissionId: uuidSchema,
  createdAt: z.string().datetime().transform(value => new Date(value).toISOString()),
  name: z.string({ required_error: fieldMessages.name, invalid_type_error: fieldMessages.name })
    .trim().min(2, fieldMessages.name).max(100, fieldMessages.name),
  email: z.string({ required_error: fieldMessages.email, invalid_type_error: fieldMessages.email })
    .refine(value => !/[\r\n]/.test(value), fieldMessages.email)
    .transform(value => value.trim())
    .pipe(z.string().email(fieldMessages.email).max(254, fieldMessages.email)),
  budget: z.enum(['500-1000', '1000-2500', '2500-5000', '5000-10000', '10000+'], {
    errorMap: () => ({ message: fieldMessages.budget }),
  }),
  message: z.string({ required_error: fieldMessages.message, invalid_type_error: fieldMessages.message })
    .trim().min(10, fieldMessages.message).max(5000, fieldMessages.message),
  gotcha: z.string().max(200).optional(),
}).strict();

const fieldErrorsSchema = z.object({
  name: z.tuple([z.literal(fieldMessages.name)]).optional(),
  email: z.tuple([z.literal(fieldMessages.email)]).optional(),
  budget: z.tuple([z.literal(fieldMessages.budget)]).optional(),
  message: z.tuple([z.literal(fieldMessages.message)]).optional(),
}).strict();

const reference = { submissionId: responseIdSchema.optional() };

export const contactResponseSchema = z.discriminatedUnion('code', [
  z.object({
    status: z.literal('provider_accepted'),
    code: z.literal('accepted'),
    message: z.literal('Submitted for delivery'),
    submissionId: responseIdSchema,
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('invalid'),
    code: z.literal('validation_error'),
    message: z.literal('Please check the highlighted fields.'),
    fieldErrors: fieldErrorsSchema.optional(),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('invalid'),
    code: z.literal('invalid_request'),
    message: z.literal("We couldn't submit this form. Reload the page and try again."),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('rejected'),
    code: z.literal('rejected'),
    message: z.literal("We couldn't submit this form. Please check your input."),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('rejected'),
    code: z.literal('origin_rejected'),
    message: z.literal("This request couldn't be accepted. Reload the contact page and try again."),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('invalid'),
    code: z.literal('payload_too_large'),
    message: z.literal('Your message is too large. Shorten it and try again.'),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('invalid'),
    code: z.literal('unsupported_media_type'),
    message: z.literal("We couldn't submit this form. Reload the page and try again."),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('unavailable'),
    code: z.literal('unavailable'),
    message: z.literal('Email submission is unavailable right now. Your message is still here. Please try again later.'),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('conflict'),
    code: z.literal('in_progress'),
    message: z.literal('This submission is still being processed. Retry the same submission later.'),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('conflict'),
    code: z.literal('identity_conflict'),
    message: z.literal('This reference is already associated with different content. Its delivery may be unresolved. Keep this reference before starting a new message.'),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('unavailable'),
    code: z.literal('internal_error'),
    message: z.literal("We couldn't submit your inquiry. Your message is still here. Please try again."),
  }).strict(),
  z.object({
    ...reference,
    status: z.literal('unknown'),
    code: z.literal('unknown'),
    message: z.literal('Delivery status is unknown. Retry this same submission to avoid sending a duplicate.'),
  }).strict(),
]);

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
export type ContactResponse = z.infer<typeof contactResponseSchema>;
export type ContactFieldErrors = z.infer<typeof fieldErrorsSchema>;

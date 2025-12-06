'use client'

import { useRef, useState, useTransition } from 'react'
import { createReview, ReviewFormState } from '@/app/actions/reviews'
import { Loader2, Send, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewFormProps {
    onCancel?: () => void
    onSuccess?: () => void
}

export default function ReviewForm({ onCancel, onSuccess }: ReviewFormProps) {
    const [isPending, startTransition] = useTransition()
    const [state, setState] = useState<ReviewFormState>({ success: false, message: '' })
    const formRef = useRef<HTMLFormElement>(null)

    const action = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createReview(state, formData)
            setState(result)

            if (result.success) {
                formRef.current?.reset()
                // Keep the success message visible for a moment before closing if onSuccess is provided
                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess()
                    }, 2000)
                }
            }
        })
    }

    return (
        <form ref={formRef} action={action} className="space-y-6">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-3">
                    <Star className="w-6 h-6 fill-current" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Leave a Review</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
                    Share your experience working with us.
                </p>
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
                <input type="text" name="gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                        Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-sans text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                    />
                    {state.errors?.name && <p className="text-xs text-red-500 font-medium">{state.errors.name[0]}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                        Email <span className="text-orange-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-sans text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                    />
                    <p className="text-[10px] text-stone-400">Kept private.</p>
                    {state.errors?.email && <p className="text-xs text-red-500 font-medium">{state.errors.email[0]}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="role" className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                    Role / Context <span className="text-stone-400 font-normal normal-case tracking-normal">(Optional)</span>
                </label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="e.g. Wedding Client, Portrait Session"
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-sans text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                />
                {state.errors?.role && <p className="text-xs text-red-500 font-medium">{state.errors.role[0]}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                    Your Review <span className="text-orange-500">*</span>
                </label>
                <textarea
                    id="content"
                    name="content"
                    required
                    rows={4}
                    placeholder="What was your experience like?"
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-y min-h-[120px] font-sans text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                />
                {state.errors?.content && <p className="text-xs text-red-500 font-medium">{state.errors.content[0]}</p>}
            </div>

            {state.message && (
                <div className={cn(
                    "p-4 rounded-xl text-sm font-medium flex items-center gap-2",
                    state.success ? "bg-green-50 text-green-800 border border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30" : "bg-red-50 text-red-800 border border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30"
                )}>
                    {state.success && <Star className="w-4 h-4 fill-current" />}
                    {state.message}
                </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 font-medium transition-colors text-sm"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={isPending || (state.success && !state.errors)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium text-sm rounded-full hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : state.success ? (
                        <>
                            Sent!
                        </>
                    ) : (
                        <>
                            Submit Review
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

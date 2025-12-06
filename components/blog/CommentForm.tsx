'use client'

import { useRef, useState, useTransition } from 'react'
import { createComment } from '@/app/actions/comments'
import { Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommentFormProps {
    postId: string
    parentId?: string
    onCancel?: () => void
    onSuccess?: () => void
}

export default function CommentForm({ postId, parentId, onCancel, onSuccess }: CommentFormProps) {
    const [isPending, startTransition] = useTransition()
    const [state, setState] = useState<{ success?: boolean; message?: string; errors?: any }>({})
    const formRef = useRef<HTMLFormElement>(null)

    const action = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createComment(null, formData)
            setState(result)

            if (result.success) {
                formRef.current?.reset()
                if (onSuccess) onSuccess()
            }
        })
    }

    return (
        <form ref={formRef} action={action} className="space-y-4">
            <input type="hidden" name="postId" value={postId} />
            {parentId && <input type="hidden" name="parentId" value={parentId} />}

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
                <input type="text" name="gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold text-mud-500 uppercase tracking-widest">
                    Name <span className="text-orange-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-sage-50 dark:bg-sage-800/50 border border-sage-200 dark:border-sage-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-inter text-mud-900 dark:text-sage-100 placeholder:text-sage-400"
                />
                {state.errors?.name && <p className="text-xs text-red-500 font-medium">{state.errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="comment" className="text-xs font-bold text-mud-500 uppercase tracking-widest">
                    Comment <span className="text-orange-500">*</span>
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    required
                    rows={4}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-sage-50 dark:bg-sage-800/50 border border-sage-200 dark:border-sage-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-y min-h-[120px] font-inter text-mud-900 dark:text-sage-100 placeholder:text-sage-400"
                />
                {state.errors?.comment && <p className="text-xs text-red-500 font-medium">{state.errors.comment[0]}</p>}
            </div>

            {state.message && (
                <div className={cn(
                    "p-4 rounded-xl text-sm font-medium",
                    state.success ? "bg-green-50 text-green-800 border border-green-100" : "bg-red-50 text-red-800 border border-red-100"
                )}>
                    {state.message}
                </div>
            )}

            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 px-8 py-3 bg-orange-600 dark:bg-orange-700 text-white font-fitzgerald text-lg rounded-full hover:bg-orange-700 dark:hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Posting...
                        </>
                    ) : (
                        <>
                            Post Comment
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 text-mud-600 hover:text-mud-900 dark:text-sage-400 dark:hover:text-sage-200 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

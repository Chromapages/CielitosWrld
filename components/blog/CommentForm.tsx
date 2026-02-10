'use client'

import { useRef, useState, useTransition } from 'react'
import { createComment } from '@/app/actions/comments'
import { Loader2, Send, User } from 'lucide-react'
import { motion } from 'framer-motion'

interface CommentFormProps {
    postId: string
    parentId?: string
    onCancel?: () => void
    onSuccess?: () => void
    compact?: boolean
}

export default function CommentForm({ postId, parentId, onCancel, onSuccess, compact = false }: CommentFormProps) {
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

    if (compact) {
        return (
            <form ref={formRef} action={action} className="space-y-3">
                <input type="hidden" name="postId" value={postId} />
                {parentId && <input type="hidden" name="parentId" value={parentId} />}

                <div className="hidden" aria-hidden="true">
                    <input type="text" name="gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="space-y-2">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-body text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                    />
                    {state.errors?.name && <p className="text-xs text-red-500 font-medium">{state.errors.name[0]}</p>}
                </div>

                <div className="space-y-2">
                    <textarea
                        id="comment"
                        name="comment"
                        required
                        rows={3}
                        placeholder="Write your reply..."
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none font-body text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                    />
                    {state.errors?.comment && <p className="text-xs text-red-500 font-medium">{state.errors.comment[0]}</p>}
                </div>

                {state.message && (
                    <div className={`p-3 rounded-xl text-sm font-medium ${state.success ? "bg-green-50 text-green-800 border border-green-100" : "bg-red-50 text-red-800 border border-red-100"}`}>
                        {state.message}
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <motion.button
                        type="submit"
                        disabled={isPending}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-heading font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            <>
                                Post Reply
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-body text-sm transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        )
    }

    return (
        <form ref={formRef} action={action} className="space-y-5">
            <input type="hidden" name="postId" value={postId} />
            {parentId && <input type="hidden" name="parentId" value={parentId} />}

            <div className="hidden" aria-hidden="true">
                <input type="text" name="gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="text-caption font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-body text-zinc-900 dark:text-white placeholder:text-zinc-400"
                    />
                </div>
                {state.errors?.name && <p className="text-xs text-red-500 font-medium">{state.errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="comment" className="text-caption font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Comment <span className="text-orange-500">*</span>
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    required
                    rows={4}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-y min-h-[120px] font-body text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
                {state.errors?.comment && <p className="text-xs text-red-500 font-medium">{state.errors.comment[0]}</p>}
            </div>

            {state.message && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-sm font-medium ${state.success ? "bg-green-50 text-green-800 border border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50" : "bg-red-50 text-red-800 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50"}`}
                >
                    {state.message}
                </motion.div>
            )}

            <div className="flex items-center gap-4 pt-2">
                <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-heading font-bold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                </motion.button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-body font-medium transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

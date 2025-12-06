'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, User } from 'lucide-react'
import CommentForm from './CommentForm'
import { cn } from '@/lib/utils'

interface Comment {
    _id: string
    name: string
    comment: string
    _createdAt: string
    children?: Comment[]
}

interface CommentListProps {
    comments: Comment[]
    postId: string
}

function CommentItem({ comment, postId, level = 0 }: { comment: Comment; postId: string; level?: number }) {
    const [isReplying, setIsReplying] = useState(false)

    return (
        <div className={cn("relative", level > 0 && "mt-8")}>
            {/* Connector Line for nested comments */}
            {level > 0 && (
                <div className="absolute -left-5 top-0 bottom-0 w-px bg-sage-200 dark:bg-sage-800" />
            )}

            <div className="flex gap-5">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-sage-100 dark:bg-sage-800 flex items-center justify-center text-sage-600 dark:text-sage-400 border border-sage-200 dark:border-sage-700">
                        <User className="w-6 h-6" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="font-fitzgerald text-lg font-bold text-mud-900 dark:text-sage-100">{comment.name}</span>
                            <span className="text-xs font-inter font-medium text-sage-500 uppercase tracking-wider">
                                {formatDistanceToNow(new Date(comment._createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>

                    <div className="prose prose-sage dark:prose-invert max-w-none text-base leading-relaxed font-inter text-mud-800 dark:text-sage-200">
                        <p>{comment.comment}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-1">
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-orange-800 dark:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Reply
                        </button>
                    </div>

                    {/* Reply Form */}
                    {isReplying && (
                        <div className="mt-6 pl-6 border-l-2 border-sage-100 dark:border-sage-800">
                            <CommentForm
                                postId={postId}
                                parentId={comment._id}
                                onCancel={() => setIsReplying(false)}
                                onSuccess={() => setIsReplying(false)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Nested Replies */}
            {comment.children && comment.children.length > 0 && (
                <div className="mt-8 pl-6 md:pl-16">
                    {comment.children.map((child) => (
                        <CommentItem key={child._id} comment={child} postId={postId} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function CommentList({ comments, postId }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-16 bg-sage-50 dark:bg-sage-900/30 rounded-2xl border border-sage-100 dark:border-sage-800/50">
                <div className="w-16 h-16 bg-white dark:bg-sage-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <MessageSquare className="w-8 h-8 text-sage-300 dark:text-sage-600" />
                </div>
                <p className="text-mud-600 dark:text-sage-300 font-fitzgerald text-xl mb-2">No comments yet</p>
                <p className="text-sage-500 dark:text-sage-400 text-sm font-inter">Be the first to share your thoughts!</p>
            </div>
        )
    }

    return (
        <div className="space-y-10">
            {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={postId} />
            ))}
        </div>
    )
}

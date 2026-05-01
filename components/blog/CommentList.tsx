'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, User, Heart } from 'lucide-react'
import CommentForm from './CommentForm'
import { motion } from 'framer-motion'

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

// Generate a consistent avatar color based on name
function getAvatarColor(name: string): string {
  const colors = [
    'from-orange-400 to-orange-500',
    'from-pink-400 to-pink-500',
    'from-purple-400 to-purple-500',
    'from-blue-400 to-blue-500',
    'from-green-400 to-green-500',
    'from-teal-400 to-teal-500',
    'from-red-400 to-red-500',
    'from-yellow-400 to-yellow-500',
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

// Get initials from name
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function CommentItem({ comment, postId, level = 0 }: { comment: Comment; postId: string; level?: number }) {
    const [isReplying, setIsReplying] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const avatarColor = getAvatarColor(comment.name)

    const handleLike = () => {
        setLiked(!liked)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: level * 0.1 }}
            className={level > 0 ? "mt-6" : ""}
        >
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {getInitials(comment.name)}
                    </div>
                    {/* Thread line for nested replies */}
                    {comment.children && comment.children.length > 0 && (
                        <div className="w-px h-full bg-zinc-200 dark:bg-zinc-700 mx-auto mt-2" />
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                    <div className="glass-card rounded-2xl px-5 py-4 shadow-elevation-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-archivo font-semibold text-zinc-900 dark:text-white">
                                    {comment.name}
                                </span>
                                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                    {formatDistanceToNow(new Date(comment._createdAt), { addSuffix: true })}
                                </span>
                            </div>
                        </div>

                        {/* Comment Text */}
                        <div className="font-body text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {comment.comment}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 mt-2 ml-2">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                                liked 
                                    ? 'text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-950/30' 
                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                            }`}
                        >
                            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                            {likeCount > 0 && <span>{likeCount}</span>}
                        </button>

                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Reply
                        </button>
                    </div>

                    {/* Reply Form */}
                    {isReplying && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 ml-2"
                        >
                            <div className="premium-card rounded-xl p-4 shadow-elevation-1">
                                <CommentForm
                                    postId={postId}
                                    parentId={comment._id}
                                    onCancel={() => setIsReplying(false)}
                                    onSuccess={() => setIsReplying(false)}
                                    compact
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Nested Replies */}
                    {comment.children && comment.children.length > 0 && (
                        <div className="mt-6 space-y-6">
                            {comment.children.map((child) => (
                                <CommentItem key={child._id} comment={child} postId={postId} level={level + 1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default function CommentList({ comments, postId }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16 glass-card rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700"
            >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                </div>
                <h3 className="text-h4 text-zinc-900 dark:text-white font-pattaya italic mb-2">
                    No comments yet
                </h3>
                <p className="text-body-sm text-zinc-500 dark:text-zinc-400">
                    Start the conversation—share your thoughts!
                </p>
            </motion.div>
        )
    }

    return (
        <div className="space-y-8">
            {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={postId} />
            ))}
        </div>
    )
}

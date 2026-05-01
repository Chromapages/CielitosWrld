import { client } from '@/sanity/lib/client'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { MessageCircle } from 'lucide-react'

interface CommentsProps {
  postId: string
}

async function getComments(postId: string) {
  const query = `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt asc) {
    _id,
    name,
    comment,
    _createdAt,
    parent
  }`

  return client.fetch(query, { postId }, { cache: 'no-store' })
}

function buildCommentTree(comments: any[]) {
  const commentMap: Record<string, any> = {}
  const roots: any[] = []

  // First pass: create map and initialize children array
  comments.forEach(comment => {
    comment.children = []
    commentMap[comment._id] = comment
  })

  // Second pass: link children to parents
  comments.forEach(comment => {
    if (comment.parent?._ref) {
      const parent = commentMap[comment.parent._ref]
      if (parent) {
        parent.children.push(comment)
      } else {
        // If parent not found (e.g. not approved yet), treat as root or orphan
        // For now, let's treat as root to avoid hiding it
        roots.push(comment)
      }
    } else {
      roots.push(comment)
    }
  })

  return roots
}

export default async function Comments({ postId }: CommentsProps) {
  const comments = await getComments(postId)
  const commentTree = buildCommentTree(comments)

  return (
    <section className="max-w-3xl mx-auto mt-20 pt-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-h3 text-zinc-900 dark:text-white font-pattaya italic">
            Discussion
          </h2>
          <p className="text-caption text-zinc-500 dark:text-zinc-400">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </p>
        </div>
      </div>

      {/* Comment Form Card */}
      <div className="premium-card rounded-2xl p-6 md:p-8 mb-12 shadow-elevation-2">
        <CommentForm postId={postId} />
      </div>

      {/* Comments List */}
      <CommentList comments={commentTree} postId={postId} />
    </section>
  )
}

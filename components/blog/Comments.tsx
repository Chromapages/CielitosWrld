import { client } from '@/sanity/lib/client'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

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
    <section className="max-w-3xl mx-auto mt-24 pt-16 border-t border-sage-200 dark:border-sage-800">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-fitzgerald text-mud-900 dark:text-sage-100">
          Comments ({comments.length})
        </h2>
      </div>

      <div className="mb-16 bg-white dark:bg-sage-900 p-8 rounded-2xl shadow-sm border border-sage-100 dark:border-sage-800">
        <h3 className="text-lg font-inter font-medium text-mud-700 dark:text-sage-300 mb-6">Leave a note</h3>
        <CommentForm postId={postId} />
      </div>

      <CommentList comments={commentTree} postId={postId} />
    </section>
  )
}
export type CommentType = {
  id: number,
  authorName: string,
  authorId: number,
  comment: string,
  replies?: CommentType[]
}

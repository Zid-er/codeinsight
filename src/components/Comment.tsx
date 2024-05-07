// idk what happened here but my tab size is broken (4 spaces)
// it really pisses me off
import { CommentType } from '../types/CommentType'

type CommentProps = {
    comment: CommentType
}
// TODO: implement replies visibility toggle
const Comment = ({ comment }: CommentProps) => {
    return (
        <div>
            <p className="text-sm pb-1.5 font-medium dark:text-neutral-400">{comment.authorName}</p>
            <div className="flex align-center px-4 py-4 border min-h-16 border-slate-200 dark:bg-primary dark:border-none rounded-lg">
                <p className="text-sm text-neutral-300 max-w-[90%]">{comment.comment}</p>
            </div>
            {comment.replies ? comment.replies.map((comment, index) => (
                <div className="pl-8 pt-2 border-neutral-400 border-l"  key={index}>
                    <Comment comment={comment} />
                </div>
            )) : null}
        </div>
    )
}

export default Comment

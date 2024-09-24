import { IComment } from "../types";
import { Comment } from "./Comment";
import { useAppDispatch } from "../hooks";
import { removeComment, addLike } from "../commentsSlice";
import "./styles.css";

type CommentsListProps = {
    comments: IComment[];
};

export const CommentsList = ({ comments }: CommentsListProps) => {
    const dispatch = useAppDispatch();

    const handleRemoveComment = (id: number) => {
        dispatch(removeComment(id));
    };
    const handleLikeComment = (id: number) => {
        dispatch(addLike(id));
    };

    return (
        <ul className="comments-list">
            {comments.map((comment: IComment) => (
                <Comment
                    key={comment.id}
                    content={comment.body}
                    author={comment?.user?.fullName || comment.user.username}
                    likes={comment.likes}
                    onDelete={() => handleRemoveComment(comment.id as number)}
                    onLike={() => handleLikeComment(comment.id as number)}
                />
            ))}
        </ul>
    );
};

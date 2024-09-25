import { Comment } from "./Comment";
import { useAppDispatch } from "../../hooks";
import { removeComment, addLike } from "../../slices/commentsSlice";
import { IComment } from "../../types";
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
            {comments.map((comment: IComment) => {
                const { id, body, user } = comment;
                return (
                    <Comment
                        key={id}
                        content={body}
                        author={user?.username || (user?.fullName as string)}
                        likes={comment.likes}
                        onDelete={() => handleRemoveComment(id as number)}
                        onLike={() => handleLikeComment(id as number)}
                    />
                );
            })}
        </ul>
    );
};

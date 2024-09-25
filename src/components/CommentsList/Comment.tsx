import { Button } from "@mui/material";
import { CommentProps } from "./types";

export const Comment = ({
    content,
    author,
    likes,
    onDelete,
    onLike,
}: CommentProps) => (
    <li className="grid-row">
        <div className="grid-col">
            <p>{content}</p>
            <div className="grid-row">
                <span onClick={onLike}>{likes ?? likes} &#9829;</span>
                {author && <span>{author}</span>}
            </div>
        </div>
        <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onDelete}
        >
            Delete
        </Button>
    </li>
);

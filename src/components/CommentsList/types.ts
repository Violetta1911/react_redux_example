export type CommentProps = {
    content: string;
    author: string;
    likes?: number;
    onDelete: () => void;
    onLike: () => void;
};

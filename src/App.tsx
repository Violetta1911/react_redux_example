import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchComments, addComment } from "./slices/commentsSlice";
import { CommentsList } from "./components/CommentsList";
import { Button, Grid2, TextField } from "@mui/material";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comments, status } = useAppSelector((state) => state.comments);
    const [newComment, setNewComment] = useState<string>("");

    // Fetch comments on component mount
    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    // Handle adding a new comment
    const handleAddComment = () => {
        const comment = {
            id: Date.now(),
            body: newComment,
            user: { username: "User" },
        };
        dispatch(addComment(comment));
        setNewComment("");
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleAddComment();
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px" }}>
            <h1>Comments App</h1>
            <Grid2 container spacing={2} wrap="wrap">
                <Grid2 size={"grow"}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Enter your comment"
                        value={newComment}
                        type="text"
                        size="small"
                        fullWidth
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                    <Button
                        variant="contained"
                        onClick={handleAddComment}
                        fullWidth
                    >
                        Add Comment
                    </Button>
                </Grid2>
            </Grid2>

            {status === "loading" && <p>Loading...</p>}
            {comments.length > 0 ? (
                <CommentsList comments={comments} />
            ) : (
                <span>No comments yet...</span>
            )}
        </div>
    );
};

export default App;

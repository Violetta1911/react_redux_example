import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchComments, addComment } from "./slices/commentsSlice";
import { CommentsList } from "./components/CommentsList";
import { Button, Grid2, TextField } from "@mui/material";
import { IComment } from "./types";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comments, status } = useAppSelector((state) => state.comments);
    const [newComment, setNewComment] = useState<string>(() => {
        return sessionStorage.getItem("inputValue") || "";
    });

    // Fetch comments on component mount
    useEffect(() => {
        if (comments.length === 0) {
            // Optional: Fetch only if comments are not persisted
            dispatch(fetchComments());
        }
        // return to srolled position
        const savedScrollPosition = sessionStorage.getItem("scrollPosition");
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }

        // save scroll position
        const handleScroll = () => {
            sessionStorage.setItem("scrollPosition", `${window.scrollY}`);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, comments.length]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewComment(value);
        sessionStorage.setItem("inputValue", value);
    };

    // Handle adding a new comment
    const handleAddComment = () => {
        if (newComment.trim() === "") return; // Prevent adding empty comments

        const comment: IComment = {
            id: Date.now(),
            body: newComment,
            user: { username: "User" },
            likes: 0,
        };
        sessionStorage.setItem("inputValue", "");
        dispatch(addComment(comment));
        setNewComment("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleAddComment();
        }
    };
    const refreshData = () => {
        dispatch(fetchComments());
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px" }}>
            <h1>Comments App</h1>
            <Button
                variant="outlined"
                onClick={refreshData}
                style={{ marginBlock: "20px" }}
            >
                Clear comments cash
            </Button>
            <Grid2 container spacing={2} wrap="wrap">
                <Grid2 size={"grow"}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Enter your comment"
                        value={newComment}
                        type="text"
                        size="small"
                        fullWidth
                        onChange={handleInput}
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
            {comments.length > 0 && status !== "loading" && (
                <CommentsList comments={comments} />
            )}
            {status !== "loading" ||
                (!comments.length && <span>No comments yet...</span>)}
        </div>
    );
};

export default App;

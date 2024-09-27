// commentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IComment, ICommentsState } from "../../types";

// Initial state
const initialState: ICommentsState = {
    comments: [],
    status: "idle",
    error: null,
};

// Fetch comments from the API
export const fetchComments = createAsyncThunk<
    IComment[],
    void,
    { rejectValue: string }
>("comments/fetchComments", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_COMMENTS_API_URL as string,
        );
        return response.data.comments as IComment[];
    } catch (error) {
        if (axios.isAxiosError(error) && error.message) {
            return rejectWithValue(error.message);
        } else if (error instanceof Error) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue("An unknown error occurred");
        }
    }
});

// ... other async thunks like deleteComment and updateComment

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<IComment>) => {
            state.comments = [action.payload, ...state.comments];
        },
        removeComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter(
                (comment) => comment.id !== action.payload,
            );
        },
        addLike: (state, action: PayloadAction<number>) => {
            const comment = state.comments.find(
                (comment) => comment.id === action.payload,
            );
            if (comment) {
                comment.likes ? (comment.likes += 1) : (comment.likes = 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = "loading";
                state.error = null; // Reset error on new fetch
            })
            .addCase(
                fetchComments.fulfilled,
                (state, action: PayloadAction<IComment[]>) => {
                    state.status = "succeeded";
                    state.comments = action.payload;
                },
            )
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string; // Capture the error message
            });
        // Handle other async thunks similarly
    },
});

// Export actions and reducer
export const { addComment, removeComment, addLike } = commentsSlice.actions;
export default commentsSlice.reducer;

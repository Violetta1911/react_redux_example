import commentsReducer, { addComment, removeComment, fetchComments } from ".";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ICommentsState } from "../../types";

// Mock axios
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("commentsSlice", () => {
    const initialState: ICommentsState = {
        comments: [],
        status: "idle",
        error: null,
    };

    it("should handle initial state", () => {
        expect(commentsReducer(undefined, { type: "unknown" })).toEqual(
            initialState,
        );
    });

    it("should handle adding a comment", () => {
        const newComment = {
            id: 1,
            body: "This is a new comment",
            user: { username: "User1" },
        };

        const state = commentsReducer(initialState, addComment(newComment));

        expect(state.comments).toEqual([newComment]); // Check if the comment is added
    });

    it("should handle removing a comment", () => {
        const initialStateWithComments: ICommentsState = {
            comments: [
                { id: 1, body: "First comment", user: { username: "User1" } },
            ],
            status: "idle",
        };

        const state = commentsReducer(
            initialStateWithComments,
            removeComment(1),
        );

        expect(state.comments).toEqual([]); // Check if the comment is removed
    });

    it("should handle fetchComments", async () => {
        const commentsData = [
            { id: 1, body: "First comment", user: { username: "User1" } },
            { id: 2, body: "Second comment", user: { username: "User2" } },
        ];

        mockedAxios.get.mockResolvedValueOnce({
            data: { comments: commentsData },
        });

        const store = configureStore({
            reducer: { comments: commentsReducer },
        });

        await store.dispatch(fetchComments() as any); // Cast to any to avoid typing issues

        const state = store.getState().comments;

        expect(state.status).toEqual("succeeded");
        expect(state.comments).toEqual(commentsData);
    });

    it("should handle failed fetchComments", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

        const store = configureStore({
            reducer: { comments: commentsReducer },
        });

        await store.dispatch(fetchComments() as any); // Cast to any to avoid typing issues

        const state = store.getState().comments;

        expect(state.status).toEqual("failed");
        expect(state.comments).toEqual([]); // Ensure no comments are added on failure
    });
});

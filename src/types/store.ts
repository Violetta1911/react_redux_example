import { IComment } from "./comments";

export interface ICommentsState {
    comments: IComment[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error?: string | null;
}

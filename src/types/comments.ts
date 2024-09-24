import { IUser } from "./user";

export interface IComment {
    id: number;
    body: string;
    user: IUser;
    likes?: number;
}

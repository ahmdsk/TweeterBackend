import { Document } from "mongoose";

export interface IPosts extends Document {
    user: Object,
    posts: string,
    access: boolean,
    photos?: [],
    createdAt: Date,
    updatedAt?: Date
}
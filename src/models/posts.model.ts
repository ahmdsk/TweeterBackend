import { model, Schema, Types } from "mongoose"
import { IPosts } from "../interface/PostsInterface"

const postsSchema: Schema<IPosts> = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "users"
    },
    posts: {
        type: String
    },
    access: {
        type: Boolean,
        required: true
    },
    photos: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})

export const Posts = model<IPosts>('posts', postsSchema)
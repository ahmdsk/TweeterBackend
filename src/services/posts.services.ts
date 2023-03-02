import { Posts } from "../models/posts.model";

async function GetPostService(): Promise<any> {
    try {
        return await Posts.find().populate("user")
    } catch (error) {
        throw error
    }
}

export { GetPostService }
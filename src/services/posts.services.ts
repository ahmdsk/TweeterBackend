import { IPosts } from "../interface/PostsInterface";
import { Posts } from "../models/posts.model";

async function GetPostService(): Promise<IPosts[]> {
    try {
        return await Posts.find().populate("user", '-password -bio -phone')
    } catch (error) {
        throw error
    }
}

async function GetUserPostService(id: string): Promise<IPosts[]> {
    try {
        return await Posts.find({user: id}).populate("user")
    } catch (error) {
        throw error
    }
}

async function AddPostService(params: object) {
    try {
        return await new Posts(params).save()
    } catch (error) {
        throw error
    }
}

export { GetPostService, GetUserPostService, AddPostService }
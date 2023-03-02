import { Request, Response } from "express"
import { GetPostService, GetUserPostService } from "../services/posts.services"

async function posts(req: Request, res: Response) {
    const posts = await GetPostService()

    if(posts.length > 0) {
        res.status(200).json({
            status: true,
            message: 'Posts Found',
            data: posts
        })
    } else {
        res.status(404).json({
            status: false,
            message: 'Posts Not Found'
        })
    }
}

async function userPost(req: Request, res: Response) {
    const user_post = await GetUserPostService(req.params.id)

    if(user_post.length > 0) {
        res.status(200).json({
            status: true,
            message: `Get Post By Id User ${req.params.id}`,
            data: user_post
        })
    } else {
        res.status(404).json({
            status: false,
            message: `User hasn't posted anything yet`
        })
    }
}

async function addPost(req: Request, res: Response) {
    console.log(req.body)

    res.status(200).json({
        status: true,
        message: 'Post has been uploaded'
    })
}

export { posts, userPost, addPost }
import { Request, Response } from "express"
import { GetPostService } from "../services/posts.services"

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

async function getPostsUser(req: Request, res: Response) {
    res.status(200).json({
        status: true,
        message: 'Get Post By User'
    })
}

export { posts }
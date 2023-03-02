import { Request, Response } from "express"
import { AddPostService, GetPostService, GetUserPostService } from "../services/posts.services"
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { Users } from "../models/users.model"

const SECRET_KEY: Secret = "ahmd-anggun"

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
    try {
        const checkUser = await Users.findById(req.params.id)
        const userPost = await GetUserPostService(checkUser._id)

        if(userPost.length > 0) {
            res.status(200).json({
                status: true,
                message: `Get Post By User ${checkUser.name}`,
                data: userPost
            })
        } else {
            res.status(404).json({
                status: false,
                message: `User hasn't posted anything yet`
            })
        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: 'User Or Posts Not Found'
        })
    }
}

async function addPost(req: Request, res: Response) {
    const headerToken = req.headers.authorization
    const token = headerToken?.split(' ')[1]

    if(token != null) {
        const decodeToken = jwt.verify(token, SECRET_KEY) as JwtPayload
        const userId = decodeToken?._id
        const { posts, access } = req.body

        const addPost = await AddPostService({
            user: userId,
            posts,
            access
        })

        if(addPost) {
            res.status(200).json({
                status: true,
                message: 'Post Has Been Uploaded',
                data: addPost
            })
        } else {
            res.status(500).json({
                status: false,
                message: 'Post Cannot Be Upload'
            })
        }
    }

}

export { posts, userPost, addPost }
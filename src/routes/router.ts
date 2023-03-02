import express, { Request, Response } from "express"
import passport from "passport"
import { login, register } from "../controller/auth.controller"
import { posts } from "../controller/posts.controller"
import { auth } from "../middleware/auth"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'Welcome to tweeter API'
    })
})

// Auth
router.post('/register', register)
router.post('/login', login)

// Posts
router.get('/posts', posts)

export default router
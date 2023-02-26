import express, { Request, Response } from "express"
import { register } from "../controller/auth.controller"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'Welcome to tweeter API'
    })
})

// Auth
router.post('/register', register)

export default router
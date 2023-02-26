import { Request, Response } from "express"
import { RegisterService } from "../services/auth.services"

async function register (req: Request, res: Response) {
    try {
        await RegisterService(req.body)

        res.status(200).json({
            status: true,
            message: 'Register User Successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Register Failed!',
            data: error
        })
    }
}

export { register }
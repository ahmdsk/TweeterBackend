import { Request, Response } from "express"
import { LoginService, RegisterService } from "../services/auth.services"

async function register (req: Request, res: Response) {
    try {
        const data = await RegisterService(req.body)

        res.json({
            status: true,
            message: 'Register User Successfully',
            data: data
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Register Failed!',
            data: error
        })
    }
}

async function login (req: Request, res: Response) {
    try {
        const user = await LoginService(req.body)
        console.log(user)

        res.json({
            status: true,
            message: 'Login Successfully',
            data: user
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Login Failed!',
            data: error
        })
    }
}

export { register, login }
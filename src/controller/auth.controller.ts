import { Request, Response } from "express"
import { LoginService, RegisterService } from "../services/auth.services"

async function register (req: Request, res: Response) {
    try {
        const data = await RegisterService(req.body)

        res.status(200).json({
            status: true,
            message: 'Register User Successfully',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Register Failed!',
            data: error
        })
    }
}

async function login (req: Request, res: Response) {
    try {
        const user = await LoginService(req.body)

        res.status(200).json({
            status: true,
            message: 'Login Successfully',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Login Failed!',
            data: error
        })
    }
}

async function logout () {
    
}

export { register, login, logout }
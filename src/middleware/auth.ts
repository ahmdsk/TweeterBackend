import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

export const SECRET_KEY: Secret = "ahmd-anggun"

export interface CostumReq extends Request {
    token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if(!token) {
            throw new Error()
        }

        (req as CostumReq).token = jwt.verify(token, SECRET_KEY)

        next()
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Please authenticate'
        })
    }
}
import { IUser } from "../interface/UserInterface"
import { Users } from "../models/users.model"
import jwt, { Secret } from "jsonwebtoken"
import bcrypt from "bcrypt"

async function RegisterService(user: IUser) {
    try {
        const data: IUser = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            password: user.password,
            bio: user.bio ?? "",
            photo: user.photo ?? ""
        }

        await Users.build(data).save()
    } catch (error) {
        throw error
    }
}

async function LoginService(user: IUser) {
    try {
        const checkUser = await Users.findOne({
            email: user.email
        })

        if(!checkUser) {
            return {
                errors: 'Email not found'
            }
        }

        const isMatch = bcrypt.compareSync(user.password, checkUser.password)
        const SECRET_KEY: Secret = "ahmd-anggun"

        if(isMatch) {
            const token = jwt.sign({ 
                _id: checkUser._id.toString(),
                name: checkUser.name
             }, SECRET_KEY, {
                expiresIn: '2 days'
            })

            return {
                user: checkUser,
                token: token
            }
        } else {
            return {
                errors: 'Password is incorrect' 
            }
        }
    } catch (error) {
        throw error
    }
}

export { RegisterService, LoginService }
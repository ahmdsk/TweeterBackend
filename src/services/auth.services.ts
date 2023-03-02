import { IUser } from "../interface/UserInterface"
import { Users } from "../models/users.model"
import jwt, { Secret } from "jsonwebtoken"
import bcrypt from "bcrypt"

const SECRET_KEY: Secret = "ahmd-anggun"

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

        const checkEmail = Users.findOne({
            email: user.email
        })

        if(await checkEmail) {
            return {
                errors: 'Email already taken!'
            }
        } else {
            const user = await Users.build(data).save()
            const token = jwt.sign({ 
                _id: user._id.toString(),
                name: user.name
             }, SECRET_KEY, {
                expiresIn: '2 days'
            })

            return {
                user, token
            }
        }
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
            throw {
                errors: 'Email not found'
            }
        }

        const isMatch = bcrypt.compareSync(user.password, checkUser.password)

        if(isMatch) {
            const token = jwt.sign({ 
                _id: checkUser._id.toString(),
                name: checkUser.name
             }, SECRET_KEY, {
                expiresIn: '2 days'
            })

            return {
                token
            }
        } else {
            throw {
                errors: 'Password is incorrect' 
            }
        }
    } catch (error) {
        throw error
    }
}

export { RegisterService, LoginService }
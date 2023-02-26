import { model, Schema } from "mongoose"
import { IUser, UsersModelInterface } from "../interface/UserInterface"
import bcrypt from "bcrypt"

const usersSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    photo: {
        type: String
    }
})

usersSchema.statics.build = (attr: IUser) => {
    return new Users(attr)
}

const saltRound: number = 8

usersSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRound)
    }
    next()
})

export const Users = model<any, UsersModelInterface>('users', usersSchema)
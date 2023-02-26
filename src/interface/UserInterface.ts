import { Document, Model } from "mongoose"

export interface IUser {
    name: string,
    phone: string,
    email: string,
    password: string,
    photo: string,
    bio: string
}

interface UserDoc extends Document {
    name: string,
    bio: string,
    phone: string,
    email: string,
    photo: string,
    password: string
}

export interface UsersModelInterface extends Model<any> {
    build(attr: IUser): UserDoc
}
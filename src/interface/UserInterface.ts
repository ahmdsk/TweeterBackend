import { Document, Model } from "mongoose"

export interface IUser {
    name: string,
    bio?: string,
    phone: string,
    email: string,
    password: string,
    photo?: string,
}

interface UserDoc extends Document {
    name: string,
    bio?: string,
    phone: string,
    email: string,
    password: string,
    photo?: string,
}

export interface UsersModelInterface extends Model<any> {
    build(attr: IUser): UserDoc
}
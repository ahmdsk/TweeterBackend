import { IUser, UsersModelInterface } from "../interface/UserInterface"
import { Users } from "../models/users.model"

export async function RegisterService(user: IUser) {
    try {
        await Users.build(user).save()
    } catch (error) {
        throw error
    }
}
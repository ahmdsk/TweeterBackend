import { UpdateWriteOpResult } from "mongoose"
import { IUser } from "../interface/UserInterface";
import { Users } from "../models/users.model";

async function ProfileService(id: string): Promise<IUser> {
    try {
        return Users.findById(id).select('-password')
    } catch (error) {
        throw error
    }
}

async function EditProfileService(id: string, payload: object): Promise<UpdateWriteOpResult> {
    try {
        return Users.findById(id).updateOne(payload)
    } catch (error) {
        throw error
    }
}

export { ProfileService, EditProfileService }
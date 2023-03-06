import { Request, Response } from "express"
import { IUser } from "../interface/UserInterface"
import { EditProfileService, ProfileService } from "../services/users.services"

async function profile(req: Request, res: Response) {
    try {
        const profile = await ProfileService(req.params.id)

        if(profile) {
            res.status(200).json({
                status: true,
                message: 'User found',
                data: profile
            })
        }
    } catch (error: any) {
        res.status(404).json({
            status: false,
            message: 'User not found',
            data: {
                errors: error.message
            }
        })
    }
}

async function editProfile(req: Request, res: Response) {
    try {
        const profile = await ProfileService(req.params.id)
        const photo = req.file as Express.Multer.File

        const newProfile = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            bio: req.body.bio,
            photo: photo != undefined ? photo.filename : profile.photo
        }

        if(profile) {
            try {
                await EditProfileService(profile.id, newProfile)
                res.status(200).json({
                    status: true,
                    message: 'Update Profile Successfully',
                })
            } catch (error: any) {
                res.status(500).json({
                    status: false,
                    message: 'User Not Found',
                    data: {
                        errors: error.message
                    }
                })
            }
        }
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Update Profile Failed',
            data: {
                errors: error.message
            }
        })
    }
}

export { profile, editProfile }
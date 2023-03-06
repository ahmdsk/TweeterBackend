import express, { Request, Response } from "express";
import multer from "multer";
import { PostUploader } from "../config/PostUploader";
import { UploadProfile } from "../config/UploadProfile";
import { login, register } from "../controller/auth.controller";
import {
  addPost,
  editPost,
  posts,
  userPost,
} from "../controller/posts.controller";
import { editProfile, profile } from "../controller/users.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Welcome to tweeter API",
  });
});

// Auth
router.post("/register", register);
router.post("/login", login);

// Posts
router.get("/posts", posts);
router.get("/posts/:id", userPost);
router.put("/posts/:postid", editPost);
router.post("/posts", auth, PostUploader.any(), addPost);

// Profile
router.get("/profile/:id", profile)
router.post("/profile/:id", UploadProfile.single('photo'), editProfile)

export default router;

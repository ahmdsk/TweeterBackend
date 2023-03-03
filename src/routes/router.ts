import express, { Request, Response } from "express";
import { upload } from "../config/multer";
import { login, register } from "../controller/auth.controller";
import {
  addPost,
  editPost,
  posts,
  userPost,
} from "../controller/posts.controller";
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
router.post("/posts", auth, upload.any(), addPost);

export default router;

import { Router } from "express";
import postController from "../../controller/post/postController";

const postRoute = Router();

postRoute.post("/", postController.createPost);

export default postRoute;

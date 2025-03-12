import { NextFunction, Request, Response } from "express";
import { SUCCESS, successResponse } from "../../utils/express/helpers";
import PostService from "../../service/post/PostService";
import db from "../../database/postgres";
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const t = await db.sequelize.transaction();
  const { content, header, imageUrl, createdBy } = req.body;
  try {
    const postService = new PostService();
    await postService.createPost({ content, createdBy, header, imageUrl, t });

    await t.commit();
    return successResponse(SUCCESS.createSuccess, null, res);
  } catch (error) {
    await t.rollback();
    next();
  }
};

export default {
  createPost,
};

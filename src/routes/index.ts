import { Router } from "express";

import { HttpSuccessStatus } from "../utils/express/constants";
import { successResponse } from "../utils/express/helpers";
import sampleRoutes from "./sampleRoutes";
import postRoute from "./postRoutes";

const router = Router();

const SUCCESS = {
  fetchSuccess: (message = "Data Fetched Successfully") => ({
    status: HttpSuccessStatus.Ok,
    message,
  }),
};

router.get("/", (_req, res) => {
  successResponse(
    SUCCESS.fetchSuccess(`${process.env.SERVICE_NAME} API`),
    {},
    res
  );
});

router.use("/sample", sampleRoutes);
router.use("/posts", postRoute);

export default router;

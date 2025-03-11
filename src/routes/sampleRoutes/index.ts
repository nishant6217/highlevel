import { Router } from "express";
import sampleController from "../../controller/sample/sampleController";

const sampleRoute = Router();

sampleRoute.get("/sampleRoute", sampleController.sampleController);

export default sampleRoute;

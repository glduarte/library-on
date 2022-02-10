import { Router } from "express";
import CreateSessionController from "./controllers/createSession.controller";

const createSessionController = new CreateSessionController();

const sessionRouter = Router();

sessionRouter.post("/", createSessionController.handle);

export default sessionRouter;

import { Router } from "express";
import CreateUserController from "./controllers/createUser.controller";

const createUserController = new CreateUserController();

const userRouter = Router();

userRouter.post("/", createUserController.handle);

export default userRouter;

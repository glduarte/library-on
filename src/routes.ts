import { Router } from "express";
import bookRouter from "./modules/books/book.routes";
import userRouter from "./modules/users/user.routes";

const routerMapper = Router();

routerMapper.use("/books", bookRouter);
routerMapper.use("/users", userRouter);

export { routerMapper };

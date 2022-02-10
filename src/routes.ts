import { Router } from "express";
import bookRouter from "./modules/books/book.routes";
import sessionRouter from "./modules/session/session.routes";
import userRouter from "./modules/users/user.routes";
import EnsureAdmin from "./shared/middlewares/ensureAdmin.middleware";
import EnsureAuthenticated from "./shared/middlewares/ensureAuthenticated.middleware";

const ensureAuthenticated = new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();

const routerMapper = Router();

routerMapper.use("/books", ensureAuthenticated.handle, ensureAdmin.handle, bookRouter);
routerMapper.use("/users", userRouter);
routerMapper.use("/session", sessionRouter);

export { routerMapper };

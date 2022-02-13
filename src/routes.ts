import { Router } from "express";
import bookRouter from "./modules/books/book.routes";
import sessionRouter from "./modules/session/session.routes";
import userRouter from "./modules/users/user.routes";
import bookRentRouter from "./modules/bookRent/bookRent.routes";

const routerMapper = Router();

routerMapper.use("/books", bookRouter);
routerMapper.use("/users", userRouter);
routerMapper.use("/session", sessionRouter);
routerMapper.use("/book-rent", bookRentRouter);

export { routerMapper };

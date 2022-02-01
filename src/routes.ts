import { Router } from "express";
import bookRouter from "./modules/books/book.routes";

const routerMapper = Router();

routerMapper.use("/books", bookRouter);

export { routerMapper };

import { Router } from "express";
import CreateBookController from "./controllers/createBook.controller";
import ShowBooksController from "./controllers/showBooks.controller";

const createBookController = new CreateBookController();
const showBooksController = new ShowBooksController();

const bookRouter = Router();

bookRouter.get("/", showBooksController.handle);

bookRouter.post("/", createBookController.handle);

export default bookRouter;

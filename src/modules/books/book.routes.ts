import { Router } from "express";
import CreateBookController from "./controllers/createBook.controller";
import DeleteBookController from "./controllers/deleteBook.controller";
import ShowBooksController from "./controllers/showBooks.controller";
import UpdateBookController from "./controllers/updateBook.controller";

const createBookController = new CreateBookController();
const showBooksController = new ShowBooksController();
const updateBookController = new UpdateBookController();
const deleteBookController = new DeleteBookController();

const bookRouter = Router();

bookRouter.get("/", showBooksController.handle);

bookRouter.post("/", createBookController.handle);

bookRouter.patch("/:id", updateBookController.handle);

bookRouter.delete("/:id", deleteBookController.handle);

export default bookRouter;

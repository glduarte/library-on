import { Router } from "express";
import CreateBookController from "./controllers/createBook.controller";
import DeleteBookController from "./controllers/deleteBook.controller";
import ShowBooksController from "./controllers/showBooks.controller";
import UpdateBookController from "./controllers/updateBook.controller";

import EnsureAuthenticated from "../../shared/middlewares/ensureAuthenticated.middleware";
import EnsureAdmin from "../../shared/middlewares/ensureAdmin.middleware";

const createBookController = new CreateBookController();
const showBooksController = new ShowBooksController();
const updateBookController = new UpdateBookController();
const deleteBookController = new DeleteBookController();

const ensureAuthenticated = new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();

const bookRouter = Router();

bookRouter.get("/", showBooksController.handle);

bookRouter.use(ensureAuthenticated.handle, ensureAdmin.handle);

bookRouter.post("/", createBookController.handle);

bookRouter.patch("/:id", updateBookController.handle);

bookRouter.delete("/:id", deleteBookController.handle);

export default bookRouter;

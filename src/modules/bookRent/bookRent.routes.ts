import { Router } from "express";
import EnsureAuthenticated from "../../shared/middlewares/ensureAuthenticated.middleware";

import CreateBookRentController from "./controllers/createBookRent.controller";

const createBookRentController = new CreateBookRentController();

const ensureAuthenticated = new EnsureAuthenticated();

const bookRentRouter = Router();

bookRentRouter.post("/", ensureAuthenticated.handle, createBookRentController.handle);

export default bookRentRouter;

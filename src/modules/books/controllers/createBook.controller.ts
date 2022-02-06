import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Controller from "../../../shared/abstract classes/controller";
import CreateBookService from "../services/createBook.service";

export default class CreateBookController implements Controller {
    async handle(
        request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        response: Response<any, Record<string, any>>
    ): Promise<any> {
        const service = new CreateBookService();
        const {
            title,
            details,
            publishYear,
            author,
            publishingCompany,
            isbn,
            quantityInStock,
        } = request.body;

        const data = await service.execute({
            title,
            details,
            publishYear,
            author,
            publishingCompany,
            isbn,
            quantityInStock,
        });

        return response.json(data);
    }
}

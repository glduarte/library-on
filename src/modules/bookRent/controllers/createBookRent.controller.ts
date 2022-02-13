import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Controller from "../../../shared/abstract_classes/controller";
import CreateBookRentService from "../services/createBookRent.service";

export default class CreateBookRentController implements Controller {
    async handle(
        request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        response: Response<any, Record<string, any>>
    ): Promise<any> {
        const service = new CreateBookRentService();

        const { userId, bookId, giveBack } = request.body;

        const data = await service.execute({ userId, bookId, giveBack });

        return response.json(data);
    }
}

import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Controller from "../../../shared/controller";
import UpdateBookService from "../services/updateBook.service";

export default class UpdateBookController implements Controller {
    async handle(
        request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        response: Response<any, Record<string, any>>
    ): Promise<any> {
        const service = new UpdateBookService();
        const { id } = request.params;
        const informationsToUpdate = request.body;
        const data = await service.execute(id, informationsToUpdate);

        return response.json(data);
    }
}

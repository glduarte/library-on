import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Controller from "../../../shared/abstract_classes/controller";
import CreateUserService from "../services/createUserService";

export default class CreateUserController implements Controller {
    async handle(
        request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        response: Response<any, Record<string, any>>
    ): Promise<any> {
        const service = new CreateUserService();
        const { name, email, password } = request.body;
        const data = await service.execute({ name, email, password });

        return response.json(data);
    }
}

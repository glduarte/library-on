import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { verify } from "jsonwebtoken";
import Middleware from "../abstract_classes/middleware";
import CustomError from "../customError";
import jwtConfig from "../../configurations/jwt.config";

interface IPayload {
    sub: string;
}

export default class EnsureAuthenticated implements Middleware {
    handle(
        request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        response: Response<any, Record<string, any>>,
        next: NextFunction
    ): void {
        const authToken = request.headers.authorization;

        if (!authToken) {
            throw new CustomError({ status: 401, message: "Invalid Token" });
        }

        const [_, token] = authToken.split(" ");
        try {
            const { sub } = verify(token, jwtConfig.secret) as IPayload;
            request.loggedUser = sub;

            return next();
        } catch (err) {
            throw new CustomError({ status: 401, message: "Unauthorized" });
        }
    }
}

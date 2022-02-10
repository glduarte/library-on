import { compare } from "bcryptjs";
import prisma from "../../../shared/prisma";
import Service from "../../../shared/abstract_classes/service";
import CustomError from "../../../shared/customError";
import { sign } from "jsonwebtoken";
import jwtConfig from "../../../configurations/jwt.config";

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionService implements Service {
    async execute(userInformations: IRequest) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: userInformations.email,
                },
            });

            if (!user) {
                throw new Error();
            }

            const passwordMatch = await compare(
                String(userInformations.password),
                user.password
            );

            if (!passwordMatch) {
                throw new Error();
            }
            const token = sign({ name: user.name }, jwtConfig.secret, {
                subject: user.id,
                expiresIn: jwtConfig.expiresIn,
            });

            return token;
        } catch (err) {
            throw new CustomError({ status: 400, message: "User not found" });
        }
    }
}

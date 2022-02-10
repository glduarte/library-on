import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import jwtConfig from "../../../configurations/jwt.config";
import Service from "../../../shared/abstract_classes/service";
import CustomError from "../../../shared/customError";
import prisma from "../../../shared/prisma";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService implements Service {
    async execute({ name, email, password }: IRequest) {
        if (!name || !email || !password) {
            throw new CustomError({
                status: 400,
                message: "Some information is missing",
            });
        }
        const emailAlreadyExists = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (emailAlreadyExists) {
            throw new CustomError({
                status: 400,
                message: "Email already registered",
            });
        }

        const encryptedPassword = await hash(String(password), 8);

        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: encryptedPassword,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            const token = sign({ name: newUser.name }, jwtConfig.secret, {
                subject: newUser.id,
                expiresIn: jwtConfig.expiresIn,
            });
            return { token, newUser };
        } catch (err) {
            throw new CustomError({
                status: 400,
                message: "Error",
            });
        }
    }
}

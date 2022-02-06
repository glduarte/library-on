import CustomError from "../../../shared/customError";
import prisma from "../../../shared/prisma";
import Service from "../../../shared/abstract_classes/service";

interface IRequest {
    title: string;
    details: string;
    publishYear: number;
    author: string;
    publishingCompany: string;
    isbn: string;
    quantityInStock: number;
}

export default class CreateBookService implements Service {
    async execute({
        title,
        details,
        publishYear,
        author,
        publishingCompany,
        isbn,
        quantityInStock,
    }: IRequest) {
        if (!title || !author || !isbn) {
            throw new CustomError({
                status: 400,
                message: "Some information is missing",
            });
        }
        try {
            const newBook = await prisma.book.create({
                data: {
                    title,
                    details,
                    publishYear,
                    author,
                    publishingCompany,
                    isbn,
                    quantityInStock,
                },
            });

            return newBook;
        } catch (err) {
            throw new CustomError({
                status: 400,
                message: "Error",
            });
        }
    }
}

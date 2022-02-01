import CustomError from "../../../shared/customError";
import prisma from "../../../shared/prisma";
import Service from "../../../shared/service";

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
        throw new CustomError({ status: 403, message: "Deu erro" });
        // if (!title || !author || !isbn) {
        // }
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

        console.log(newBook);
    }
}

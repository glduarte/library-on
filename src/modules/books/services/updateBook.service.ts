import CustomError from "../../../shared/customError";
import prisma from "../../../shared/prisma";
import Service from "../../../shared/abstract_classes/service";

interface IObjectInformations {
    title?: string;
    details?: string;
    publishYear?: number;
    author?: string;
    publishingCompany?: string;
    isbn?: string;
    quantityInStock?: number;
}

export default class UpdateBookService implements Service {
    async execute(id: string, informationsToUpdate: IObjectInformations) {
        if ("isbn" in informationsToUpdate) {
            const isbnAlreadyExists = await prisma.book.findFirst({
                where: {
                    isbn: informationsToUpdate.isbn,
                },
            });
            if (isbnAlreadyExists) {
                throw new CustomError({
                    status: 400,
                    message: "Isbn already registered",
                });
            }
        }
        try {
            const updatedBook = await prisma.book.update({
                where: {
                    id,
                },
                data: informationsToUpdate,
            });

            return updatedBook;
        } catch (err) {
            throw new CustomError({
                status: 400,
                message: "Error",
            });
        }
    }
}

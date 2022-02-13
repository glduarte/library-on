import Service from "../../../shared/abstract_classes/service";
import CustomError from "../../../shared/customError";
import prisma from "../../../shared/prisma";

interface IRequest {
    userId: string;
    bookId: string;
    giveBack: Date;
}

export default class CreateBookRentService implements Service {
    async execute({ userId, bookId, giveBack }: IRequest) {
        giveBack = new Date(giveBack);
        const haveStock = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
            select: {
                quantityInStock: true,
            },
        });

        if (!haveStock) {
            throw new CustomError({ status: 400, message: "Book not found" });
        }

        if (haveStock.quantityInStock <= 0) {
            throw new CustomError({ status: 400, message: "Book not available" });
        }

        try {
            const [newBookRent, _] = await prisma.$transaction([
                prisma.bookRent.create({
                    data: {
                        userId,
                        bookId,
                        giveBack,
                    },
                }),
                prisma.book.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        quantityInStock: haveStock.quantityInStock - 1,
                    },
                }),
            ]);

            return newBookRent;
        } catch (err) {
            console.log(err);
            throw new CustomError({ status: 400, message: "Error" });
        }
    }
}

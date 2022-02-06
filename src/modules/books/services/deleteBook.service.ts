import Service from "../../../shared/abstract_classes/service";
import CustomError from "../../../shared/customError";
import prisma from "../../../shared/prisma";

export default class DeleteBookService implements Service {
    async execute(id: string) {
        try {
            await prisma.book.delete({
                where: {
                    id: id,
                },
            });
            return { message: "Book deleted with success" };
        } catch (err) {
            throw new CustomError({ status: 400, message: "Error" });
        }
    }
}
import prisma from "../../../shared/prisma";
import Service from "../../../shared/service";

const booksReturnInformations = {
    id: true,
    title: true,
    author: true,
    details: true,
    isbn: true,
    publishingCompany: true,
    publishYear: true,
};

export default class ShowBooksService implements Service {
    async execute(search: string) {
        if (!search) {
            const allBooks = await prisma.book.findMany();
            return allBooks;
        }
        const book = await prisma.book.findUnique({
            where: {
                isbn: search,
            },
            select: booksReturnInformations,
        });
        if (book) {
            return book;
        }
        const books = await prisma.book.findMany({
            where: {
                title: {
                    contains: search,
                },
            },
            select: booksReturnInformations,
        });

        return books;
    }
}

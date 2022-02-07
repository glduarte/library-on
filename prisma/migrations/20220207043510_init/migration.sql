/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_isbn_key" ON "Book"("id", "isbn");

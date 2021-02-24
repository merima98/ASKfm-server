/*
  Warnings:

  - You are about to drop the `Disikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Disikes" DROP CONSTRAINT "Disikes_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Disikes" DROP CONSTRAINT "Disikes_userId_fkey";

-- CreateTable
CREATE TABLE "Dislikes" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Disikes";

-- AddForeignKey
ALTER TABLE "Dislikes" ADD FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislikes" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

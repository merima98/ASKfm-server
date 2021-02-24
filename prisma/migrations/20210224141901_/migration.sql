/*
  Warnings:

  - You are about to drop the `Dislikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dislikes" DROP CONSTRAINT "Dislikes_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Dislikes" DROP CONSTRAINT "Dislikes_userId_fkey";

-- DropTable
DROP TABLE "Dislikes";

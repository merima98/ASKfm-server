/*
  Warnings:

  - You are about to drop the column `username` on the `Questions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Questions.username_unique";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "username";

/*
  Warnings:

  - You are about to drop the column `body` on the `Solutions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Solutions` table. All the data in the column will be lost.
  - Added the required column `explanation` to the `Solutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solutions" DROP COLUMN "body",
DROP COLUMN "title",
ADD COLUMN     "explanation" TEXT NOT NULL;

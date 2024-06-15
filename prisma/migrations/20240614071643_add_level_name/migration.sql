/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Levels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Levels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Levels" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Levels_name_key" ON "Levels"("name");

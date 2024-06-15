/*
  Warnings:

  - A unique constraint covering the columns `[level]` on the table `Levels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Levels_level_key" ON "Levels"("level");

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Levels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Levels_name_key" ON "Levels"("name");

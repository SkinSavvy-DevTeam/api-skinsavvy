/*
  Warnings:

  - The primary key for the `Levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Levels` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Levels` table. All the data in the column will be lost.
  - The primary key for the `LevelsSolutions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `levelId` on the `LevelsSolutions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "LevelsSolutions" DROP CONSTRAINT "LevelsSolutions_levelId_fkey";

-- DropIndex
DROP INDEX "Levels_name_key";

-- AlterTable
ALTER TABLE "Levels" DROP CONSTRAINT "Levels_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "level" SERIAL NOT NULL,
ADD CONSTRAINT "Levels_pkey" PRIMARY KEY ("level");

-- AlterTable
ALTER TABLE "LevelsSolutions" DROP CONSTRAINT "LevelsSolutions_pkey",
DROP COLUMN "levelId",
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD CONSTRAINT "LevelsSolutions_pkey" PRIMARY KEY ("solutionId", "levelId");

-- AddForeignKey
ALTER TABLE "LevelsSolutions" ADD CONSTRAINT "LevelsSolutions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

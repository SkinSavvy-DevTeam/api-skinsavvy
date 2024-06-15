/*
  Warnings:

  - The primary key for the `Levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LevelsSolutions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Levels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LevelsSolutions" DROP CONSTRAINT "LevelsSolutions_levelId_fkey";

-- AlterTable
ALTER TABLE "Levels" DROP CONSTRAINT "Levels_pkey",
ADD COLUMN     "id" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "Levels_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LevelsSolutions" DROP CONSTRAINT "LevelsSolutions_pkey",
ALTER COLUMN "levelId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LevelsSolutions_pkey" PRIMARY KEY ("solutionId", "levelId");

-- AddForeignKey
ALTER TABLE "LevelsSolutions" ADD CONSTRAINT "LevelsSolutions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `levelId` on the `Solutions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Solutions" DROP CONSTRAINT "Solutions_levelId_fkey";

-- AlterTable
ALTER TABLE "Solutions" DROP COLUMN "levelId";

-- CreateTable
CREATE TABLE "LevelsSolutions" (
    "solutionId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "LevelsSolutions_pkey" PRIMARY KEY ("solutionId","levelId")
);

-- AddForeignKey
ALTER TABLE "LevelsSolutions" ADD CONSTRAINT "LevelsSolutions_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelsSolutions" ADD CONSTRAINT "LevelsSolutions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

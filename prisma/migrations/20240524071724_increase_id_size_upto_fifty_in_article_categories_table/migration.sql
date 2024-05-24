/*
  Warnings:

  - The primary key for the `ArticleCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ArticleCategories" DROP CONSTRAINT "ArticleCategories_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "ArticleCategories_pkey" PRIMARY KEY ("id");

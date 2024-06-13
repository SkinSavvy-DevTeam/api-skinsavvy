/*
  Warnings:

  - You are about to drop the `ArticleCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FullArticles" DROP CONSTRAINT "FullArticles_categoryId_fkey";

-- DropTable
DROP TABLE "ArticleCategories";

-- CreateTable
CREATE TABLE "Categories" (
    "id" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "FullArticles" ADD CONSTRAINT "FullArticles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

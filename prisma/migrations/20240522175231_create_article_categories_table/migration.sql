-- CreateTable
CREATE TABLE "ArticleCategories" (
    "id" VARCHAR(16) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ArticleCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleCategories_name_key" ON "ArticleCategories"("name");

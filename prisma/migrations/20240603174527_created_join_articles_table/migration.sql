-- CreateTable
CREATE TABLE "FullArticles" (
    "articleId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "thumbnailId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FullArticles_pkey" PRIMARY KEY ("articleId","categoryId","thumbnailId")
);

-- AddForeignKey
ALTER TABLE "FullArticles" ADD CONSTRAINT "FullArticles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullArticles" ADD CONSTRAINT "FullArticles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullArticles" ADD CONSTRAINT "FullArticles_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "ArticleThumbnails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

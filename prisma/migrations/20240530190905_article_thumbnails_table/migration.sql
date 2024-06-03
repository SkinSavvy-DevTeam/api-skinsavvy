-- CreateTable
CREATE TABLE "ArticleThumbnails" (
    "id" VARCHAR(50) NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ArticleThumbnails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleThumbnails_url_key" ON "ArticleThumbnails"("url");

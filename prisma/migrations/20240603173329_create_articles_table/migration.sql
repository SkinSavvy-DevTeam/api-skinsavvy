-- CreateTable
CREATE TABLE "Articles" (
    "id" VARCHAR(50) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

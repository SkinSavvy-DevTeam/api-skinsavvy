-- CreateTable
CREATE TABLE "Levels" (
    "id" VARCHAR(20) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solutions" (
    "id" VARCHAR(50) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "Solutions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solutions" ADD CONSTRAINT "Solutions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

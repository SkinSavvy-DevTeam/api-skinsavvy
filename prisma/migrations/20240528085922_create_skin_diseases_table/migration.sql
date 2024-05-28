-- CreateTable
CREATE TABLE "SkinDiseases" (
    "id" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkinDiseases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkinDiseases_name_key" ON "SkinDiseases"("name");

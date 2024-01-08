-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "shortName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "UID" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInternalization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "producId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "languageShortName" TEXT NOT NULL,

    CONSTRAINT "ProductInternalization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_id_shortName_key" ON "Language"("id", "shortName");

-- AddForeignKey
ALTER TABLE "ProductInternalization" ADD CONSTRAINT "ProductInternalization_producId_fkey" FOREIGN KEY ("producId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInternalization" ADD CONSTRAINT "ProductInternalization_languageId_languageShortName_fkey" FOREIGN KEY ("languageId", "languageShortName") REFERENCES "Language"("id", "shortName") ON DELETE RESTRICT ON UPDATE CASCADE;

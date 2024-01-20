-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "UID" TEXT NOT NULL,
    "imgPath" TEXT,
    "originalName" TEXT,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategoryInternalization" (
    "title" TEXT NOT NULL,
    "description" TEXT,
    "productCategoryId" INTEGER NOT NULL,
    "languageShortName" TEXT NOT NULL,

    CONSTRAINT "ProductCategoryInternalization_pkey" PRIMARY KEY ("languageShortName")
);

-- AddForeignKey
ALTER TABLE "ProductCategoryInternalization" ADD CONSTRAINT "ProductCategoryInternalization_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategoryInternalization" ADD CONSTRAINT "ProductCategoryInternalization_languageShortName_fkey" FOREIGN KEY ("languageShortName") REFERENCES "Language"("shortName") ON DELETE RESTRICT ON UPDATE CASCADE;

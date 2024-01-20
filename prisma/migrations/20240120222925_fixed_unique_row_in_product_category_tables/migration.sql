/*
  Warnings:

  - The primary key for the `ProductCategoryInternalization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[productCategoryId,languageShortName]` on the table `ProductCategoryInternalization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductCategoryInternalization" DROP CONSTRAINT "ProductCategoryInternalization_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductCategoryInternalization_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategoryInternalization_productCategoryId_languageSh_key" ON "ProductCategoryInternalization"("productCategoryId", "languageShortName");

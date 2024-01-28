/*
  Warnings:

  - You are about to drop the column `imgPath` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the `ProductImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImages" DROP CONSTRAINT "ProductImages_productId_fkey";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "imgPath",
DROP COLUMN "originalName";

-- DropTable
DROP TABLE "ProductImages";

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "imgPath" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_categoryId_key" ON "Images"("categoryId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

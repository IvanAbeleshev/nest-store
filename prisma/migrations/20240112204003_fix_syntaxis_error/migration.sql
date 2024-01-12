/*
  Warnings:

  - You are about to drop the column `producId` on the `ProductInternalization` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductInternalization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductInternalization" DROP CONSTRAINT "ProductInternalization_producId_fkey";

-- AlterTable
ALTER TABLE "ProductInternalization" DROP COLUMN "producId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductInternalization" ADD CONSTRAINT "ProductInternalization_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

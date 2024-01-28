/*
  Warnings:

  - A unique constraint covering the columns `[parentId]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_parentId_key" ON "ProductCategory"("parentId");

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

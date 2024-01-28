/*
  Warnings:

  - A unique constraint covering the columns `[UID]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_UID_key" ON "ProductCategory"("UID");

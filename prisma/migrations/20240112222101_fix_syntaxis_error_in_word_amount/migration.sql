/*
  Warnings:

  - You are about to drop the column `amout` on the `ProductAvailableAmout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductAvailableAmout" DROP COLUMN "amout",
ADD COLUMN     "amount" DOUBLE PRECISION;

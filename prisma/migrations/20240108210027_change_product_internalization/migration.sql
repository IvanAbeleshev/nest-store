/*
  Warnings:

  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `ProductInternalization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductInternalization" DROP CONSTRAINT "ProductInternalization_languageId_languageShortName_fkey";

-- DropIndex
DROP INDEX "Language_id_shortName_key";

-- AlterTable
ALTER TABLE "Language" DROP CONSTRAINT "Language_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("shortName");

-- AlterTable
ALTER TABLE "ProductInternalization" DROP COLUMN "languageId";

-- AddForeignKey
ALTER TABLE "ProductInternalization" ADD CONSTRAINT "ProductInternalization_languageShortName_fkey" FOREIGN KEY ("languageShortName") REFERENCES "Language"("shortName") ON DELETE RESTRICT ON UPDATE CASCADE;

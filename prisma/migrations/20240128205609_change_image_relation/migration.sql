-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_productId_fkey";

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

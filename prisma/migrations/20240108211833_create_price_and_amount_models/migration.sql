-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "article" TEXT;

-- AlterTable
ALTER TABLE "ProductInternalization" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "ProductPriceAndDiscount" (
    "productId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,

    CONSTRAINT "ProductPriceAndDiscount_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductAvailableAmout" (
    "productId" INTEGER NOT NULL,
    "amout" DOUBLE PRECISION,

    CONSTRAINT "ProductAvailableAmout_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductPriceAndDiscount_productId_key" ON "ProductPriceAndDiscount"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAvailableAmout_productId_key" ON "ProductAvailableAmout"("productId");

-- AddForeignKey
ALTER TABLE "ProductPriceAndDiscount" ADD CONSTRAINT "ProductPriceAndDiscount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAvailableAmout" ADD CONSTRAINT "ProductAvailableAmout_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "specifications" ADD COLUMN     "carId" TEXT;

-- CreateTable
CREATE TABLE "SpecificationsCars" (
    "carId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "SpecificationsCars_carId_key" ON "SpecificationsCars"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "SpecificationsCars_specificationId_key" ON "SpecificationsCars"("specificationId");

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

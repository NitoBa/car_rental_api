/*
  Warnings:

  - You are about to drop the `SpecificationsCars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SpecificationsCars" DROP CONSTRAINT "SpecificationsCars_carId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificationsCars" DROP CONSTRAINT "SpecificationsCars_specificationId_fkey";

-- DropTable
DROP TABLE "SpecificationsCars";

-- CreateTable
CREATE TABLE "specifications_cars" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specifications_cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "specifications_cars" ADD CONSTRAINT "specifications_cars_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications_cars" ADD CONSTRAINT "specifications_cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

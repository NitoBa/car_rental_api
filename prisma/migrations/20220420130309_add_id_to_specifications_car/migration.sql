/*
  Warnings:

  - The required column `id` was added to the `SpecificationsCars` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "SpecificationsCars_carId_key";

-- DropIndex
DROP INDEX "SpecificationsCars_specificationId_key";

-- AlterTable
ALTER TABLE "SpecificationsCars" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SpecificationsCars_pkey" PRIMARY KEY ("id");

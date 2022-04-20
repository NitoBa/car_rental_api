/*
  Warnings:

  - You are about to drop the column `carId` on the `specifications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_carId_fkey";

-- AlterTable
ALTER TABLE "specifications" DROP COLUMN "carId";

/*
  Warnings:

  - You are about to drop the column `expiredDate` on the `user_tokens` table. All the data in the column will be lost.
  - Added the required column `expiresDate` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "expiredDate",
ADD COLUMN     "expiresDate" TIMESTAMP(3) NOT NULL;

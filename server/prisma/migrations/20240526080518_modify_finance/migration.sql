/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Finance` table. All the data in the column will be lost.
  - Added the required column `name` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FinanceType" ADD VALUE 'SAVING';
ALTER TYPE "FinanceType" ADD VALUE 'INVESTMENT';

-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_eventId_fkey";

-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "createdAt",
ADD COLUMN     "dateTransac" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

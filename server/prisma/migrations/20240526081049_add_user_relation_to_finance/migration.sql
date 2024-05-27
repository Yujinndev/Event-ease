/*
  Warnings:

  - Added the required column `userId` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventGuest" DROP CONSTRAINT "EventGuest_userId_fkey";

-- AlterTable
ALTER TABLE "EventGuest" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Finance" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EventGuest" ADD CONSTRAINT "EventGuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

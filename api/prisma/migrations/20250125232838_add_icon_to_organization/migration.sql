/*
  Warnings:

  - A unique constraint covering the columns `[iconId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "iconId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_iconId_key" ON "Organization"("iconId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

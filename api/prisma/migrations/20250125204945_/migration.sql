/*
  Warnings:

  - You are about to drop the column `accountType` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LogType" ADD VALUE 'ORG_CREATED';
ALTER TYPE "LogType" ADD VALUE 'ORG_UPDATED';
ALTER TYPE "LogType" ADD VALUE 'ORG_DELETED';
ALTER TYPE "LogType" ADD VALUE 'USER_ASSIGNED_TO_ORG';
ALTER TYPE "LogType" ADD VALUE 'USER_REMOVED_FROM_ORG';
ALTER TYPE "LogType" ADD VALUE 'USER_ORG_TYPE_CHANGED';

-- AlterTable
ALTER TABLE "Logs" ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "userOrganizationId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountType";

-- CreateTable
CREATE TABLE "UserOrganization" (
    "id" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_userOrganizationId_fkey" FOREIGN KEY ("userOrganizationId") REFERENCES "UserOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

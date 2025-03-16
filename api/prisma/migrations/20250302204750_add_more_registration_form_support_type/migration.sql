/*
  Warnings:

  - The values [text] on the enum `VolunteerRegistrationFormFieldType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `sortIndex` to the `VolunteerRegistrationFormField` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VolunteerRegistrationFormFieldType_new" AS ENUM ('TEXT');
ALTER TABLE "VolunteerRegistrationFormField" ALTER COLUMN "type" TYPE "VolunteerRegistrationFormFieldType_new" USING ("type"::text::"VolunteerRegistrationFormFieldType_new");
ALTER TYPE "VolunteerRegistrationFormFieldType" RENAME TO "VolunteerRegistrationFormFieldType_old";
ALTER TYPE "VolunteerRegistrationFormFieldType_new" RENAME TO "VolunteerRegistrationFormFieldType";
DROP TYPE "VolunteerRegistrationFormFieldType_old";
COMMIT;

-- AlterTable
ALTER TABLE "VolunteerRegistrationFormField" ADD COLUMN     "sortIndex" INTEGER NOT NULL,
ALTER COLUMN "hint" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL,
ALTER COLUMN "required" SET DEFAULT false;

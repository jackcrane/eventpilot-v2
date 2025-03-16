-- CreateEnum
CREATE TYPE "VolunteerRegistrationFormFieldType" AS ENUM ('text');

-- CreateTable
CREATE TABLE "VolunteerRegistrationFormField" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "type" "VolunteerRegistrationFormFieldType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerRegistrationFormField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VolunteerRegistrationFormField" ADD CONSTRAINT "VolunteerRegistrationFormField_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

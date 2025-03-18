import { prisma } from "#prisma";
import { VolunteerRegistrationFormFieldType } from "@prisma/client";

const id = "cm6dd60bq0003o267orr77i6h";

await prisma.volunteerRegistrationFormField.createMany({
  data: [
    {
      eventId: id,
      type: VolunteerRegistrationFormFieldType.STRING,
      label: "What is your name?",
      hint: "John Doe",
      required: true,
      icon: "user",
      system_set: true,
      sortIndex: -2,
    },
    {
      eventId: id,
      type: VolunteerRegistrationFormFieldType.EMAIL,
      label: "What is your email address?",
      hint: "john.doe@example.com",
      required: true,
      icon: "mail",
      system_set: true,
      sortIndex: -1,
    },
  ],
});

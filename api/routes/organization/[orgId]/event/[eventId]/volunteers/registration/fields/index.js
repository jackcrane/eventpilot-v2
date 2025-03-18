import { prisma } from "#prisma";
import { verifyAuth } from "#verifyAuth";
import { config } from "dotenv";
config();

export const post = [
  verifyAuth(["owner", "manager"]),
  async (req, res) => {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.eventId,
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Separate new fields (with underscores in their IDs) from existing ones
    // console.log(req.body.fields.filter((field) => !field.system_set));
    const newFields = req.body.fields
      .filter((field) => !field.system_set)
      .filter((field) => field.id.includes("_"));

    const updateFields = req.body.fields
      .filter((field) => !field.system_set)
      .filter((field) => !field.id.includes("_"));

    // Create new fields (unchanged behavior)
    if (newFields.length > 0) {
      await prisma.volunteerRegistrationFormField.createMany({
        data: newFields.map((field) => ({
          eventId: event.id,
          type: field.type.toUpperCase(),
          sortIndex: field.sortIndex,
          label: field.label,
          hint: field.hint,
          description: field.description,
          icon: field.icon,
          required: field.required,
        })),
      });
    }

    // Initialize an array to record changes
    const changes = [];

    // For each existing field, compare and update if necessary
    for (const field of updateFields) {
      const existingField =
        await prisma.volunteerRegistrationFormField.findUnique({
          where: { id: field.id },
        });

      if (!existingField) continue;

      const diff = {};

      // Check each property for changes
      if (existingField.type !== field.type.toUpperCase()) {
        diff.type = {
          before: existingField.type,
          after: field.type.toUpperCase(),
        };
      }
      if (existingField.sortIndex !== field.sortIndex) {
        diff.sortIndex = {
          before: existingField.sortIndex,
          after: field.sortIndex,
        };
      }
      if (existingField.label !== field.label) {
        diff.label = { before: existingField.label, after: field.label };
      }
      if (existingField.hint !== field.hint) {
        diff.hint = { before: existingField.hint, after: field.hint };
      }
      if (existingField.description !== field.description) {
        diff.description = {
          before: existingField.description,
          after: field.description,
        };
      }
      if (existingField.icon !== field.icon) {
        diff.icon = { before: existingField.icon, after: field.icon };
      }
      if (existingField.required !== field.required) {
        diff.required = {
          before: existingField.required,
          after: field.required,
        };
      }

      // If changes are detected, update the field and record the diff
      if (Object.keys(diff).length > 0) {
        await prisma.volunteerRegistrationFormField.update({
          where: { id: field.id },
          data: {
            type: field.type.toUpperCase(),
            sortIndex: field.sortIndex,
            label: field.label,
            hint: field.hint,
            description: field.description,
            icon: field.icon,
            required: field.required,
          },
        });
        changes.push({
          id: field.id,
          changes: diff,
        });
      }
    }

    // Retrieve all updated fields for the event
    const updatedFields = await prisma.volunteerRegistrationFormField.findMany({
      where: {
        eventId: event.id,
      },
    });

    res.json({
      fields: updatedFields,
      changes,
    });
  },
];

export const get = [
  // verifyAuth(),
  async (req, res) => {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.eventId,
      },
      include: {
        registrationFormFields: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const fieldsToSend = [...event.registrationFormFields];

    res.json({
      fields: fieldsToSend,
    });
  },
];

import { verifyAuth } from "#verifyAuth";
import { prisma } from "#prisma";
import { z } from "zod";
import { serializeError } from "#serializeError";
import { AccountType } from "@prisma/client";

export const get = [
  verifyAuth(),
  async (req, res) => {
    const organizations = await prisma.organization.findMany({
      where: {
        users: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        icon: {
          select: {
            location: true,
          },
        },
      },
    });

    res.json({
      organizations,
    });
  },
];

export const post = [
  verifyAuth(),
  async (req, res) => {
    const schema = z
      .object({
        name: z
          .string({
            required_error: "You must provide an organization name",
            too_small_error: "Name must be at least 2 characters",
          })
          .min(2)
          .max(50),
        email: z.string().email().optional().nullable().or(z.literal("")),
        privateEmail: z
          .string()
          .email()
          .optional()
          .nullable()
          .or(z.literal("")),
        website: z.string().optional().nullable().or(z.literal("")),
        description: z
          .string()
          .min(2)
          .max(500)
          .optional()
          .nullable()
          .or(z.literal("")),
        address: z
          .string()
          .min(2)
          .max(500)
          .optional()
          .nullable()
          .or(z.literal("")),
        iconId: z.string().optional().nullable(),
      })
      .strict();

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ message: serializeError(result), raw: result });
    }

    if (!req.body.email || req.body.email.length === 0) {
      req.body.email = req.user.email;
    }

    const dataToInsert = {
      name: req.body.name,
      email: req.body.email,
      privateEmail: req.body.privateEmail,
      website: req.body.website,
      description: req.body.description,
      address: req.body.address,
    };

    if (req.body.iconId) {
      const icon = await prisma.file.findUnique({
        where: {
          id: req.body.iconId,
        },
      });

      if (icon) {
        dataToInsert.iconId = icon.id;
      } else {
        return res.status(400).json({
          message: "Icon file not found",
        });
      }
    }

    const newOrganization = await prisma.organization.create({
      data: {
        ...dataToInsert,
        users: {
          create: {
            userId: req.user.id,
            type: AccountType.OWNER,
          },
        },
      },
    });

    const organizations = await prisma.organization.findMany({
      where: {
        users: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    res.json({
      organizations,
      newOrganization,
    });
  },
];

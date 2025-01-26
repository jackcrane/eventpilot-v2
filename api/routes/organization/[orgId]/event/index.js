import { prisma } from "#prisma";
import { serializeError } from "#serializeError";
import { verifyAuth } from "#verifyAuth";
import { UserEventType } from "@prisma/client";
import { z } from "zod";

export const get = [
  verifyAuth(),
  async (req, res) => {
    const events = await prisma.event.findMany({
      where: {
        organizationId: req.params.orgId,
      },
      select: {
        id: true,
        name: true,
        shortName: true,
        email: true,
        website: true,
        icon: {
          select: {
            location: true,
          },
        },
      },
    });

    res.json({
      events,
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
          .max(255),
        shortName: z
          .string({
            required_error: "You must provide an organization short name",
            too_small_error: "Short name must be at least 2 characters",
          })
          .min(2)
          .max(50),
        email: z.string().email().optional().nullable().or(z.literal("")),
        website: z.string().optional().nullable().or(z.literal("")),
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
      const org = await prisma.organization.findUnique({
        where: {
          id: req.params.orgId,
        },
      });

      if (org) {
        req.body.email = org.email;
      }
    }

    const dataToInsert = {
      name: req.body.name,
      shortName: req.body.shortName.toLowerCase().replaceAll(" ", "-"),
      email: req.body.email,
      website: req.body.website,
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

    const newEvent = await prisma.event.create({
      data: {
        ...dataToInsert,
        organizationId: req.params.orgId,
        users: {
          create: {
            userId: req.user.id,
            type: UserEventType.OWNER,
          },
        },
      },
    });

    const events = await prisma.event.findMany({
      where: {
        users: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    res.json({
      events,
      newEvent,
    });
  },
];

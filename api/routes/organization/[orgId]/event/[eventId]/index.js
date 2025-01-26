import { prisma } from "#prisma";
import { verifyAuth } from "#verifyAuth";

export const get = [
  verifyAuth(),
  async (req, res) => {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.eventId,
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
      event,
    });
  },
];

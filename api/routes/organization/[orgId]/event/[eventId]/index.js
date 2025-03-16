import { prisma } from "#prisma";
// import { verifyAuth } from "#verifyAuth";
import { config } from "dotenv";
config();

export const get = [
  // verifyAuth(),
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

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({
      event: {
        ...event,
        hostedUrl: `http://${event.shortName}.${process.env.BASE_APP_URL}`,
      },
    });
  },
];

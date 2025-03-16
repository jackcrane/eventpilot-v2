import { prisma } from "#prisma";

export const get = [
  async (req, res) => {
    if (!req.query.shortName) {
      return res.status(400).json({ error: "Missing shortName query param" });
    }

    const events = await prisma.event.findMany({
      where: {
        shortName: req.query.shortName,
      },
      take: 1,
    });

    if (events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({
      event: {
        id: events[0].id,
        organizationId: events[0].organizationId,
        name: events[0].name,
        description: events[0].description,
        hostedUrl: `http://${events[0].shortName}.${process.env.BASE_APP_URL}`,
        shortName: events[0].shortName,
      },
    });
  },
];

import { verifyAuth } from "#verifyAuth";
import { prisma } from "#prisma";

export const get = [
  verifyAuth(),
  async (req, res) => {
    const organization = await prisma.organization.findUnique({
      where: {
        id: req.params.orgId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        website: true,
        description: true,
        address: true,
        icon: {
          select: {
            location: true,
          },
        },
      },
    });

    res.json({
      organization,
    });
  },
];

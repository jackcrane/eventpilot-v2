import jwt from "jsonwebtoken";
import { prisma } from "#prisma";

// Define role hierarchy
const ROLE_HIERARCHY = {
  owner: 1,
  manager: 2,
  public: 3,
};

export const verifyAuth =
  (allowedRoles = []) =>
  async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.sendStatus(401); // Unauthorized
        }

        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });

        if (!user) {
          return res.sendStatus(401); // Unauthorized
        }

        // Check if the user is suspended
        if (user.suspended && req.originalUrl !== "/api/auth/me") {
          return res.sendStatus(401); // Unauthorized
        }

        // Attach the user to the request object
        req.user = user;

        if (req.params.orgId) {
          const userOrg = await prisma.userOrganization.findFirst({
            where: {
              userId: user.id,
              organizationId: req.params.orgId,
            },
          });

          if (
            !allowedRoles.includes(userOrg?.accountType?.toLowerCase()) &&
            allowedRoles.length > 0
          ) {
            return res
              .status(403)
              .json({ message: "Access forbidden: insufficient permissions" });
          }
        }

        next();
      });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  };

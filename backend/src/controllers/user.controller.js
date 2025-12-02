const prisma = require("../db/prisma");

const userController = {
  // Get all users (for dropdown)
  getAllUsers: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          favorites: {
            include: {
              property: true,
            },
          },
        },
        orderBy: {
          username: "asc",
        },
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;

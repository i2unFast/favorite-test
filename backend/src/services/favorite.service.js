const prisma = require("../db/prisma");

const favoriteService = {
  // Get all favorites
  getAllFavorites: async () => {
    try {
      const favorites = await prisma.favorite.findMany({
        include: {
          user: true,
          property: true,
        },
      });
      return favorites;
    } catch (error) {
      throw new Error(`Error fetching favorites: ${error.message}`);
    }
  },

  // Get favorite by ID
  getFavoriteById: async (id) => {
    try {
      const favorite = await prisma.favorite.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
          property: true,
        },
      });
      if (!favorite) {
        throw new Error("Favorite not found");
      }
      return favorite;
    } catch (error) {
      throw new Error(`Error fetching favorite: ${error.message}`);
    }
  },

  // Get favorites by user ID
  getFavoritesByUserId: async (userId) => {
    try {
      const favorites = await prisma.favorite.findMany({
        where: { userId: parseInt(userId) },
        include: {
          property: true,
          user: true,
        },
      });
      return favorites;
    } catch (error) {
      throw new Error(`Error fetching user favorites: ${error.message}`);
    }
  },

  // Get favorites by property ID
  getFavoritesByPropertyId: async (propertyId) => {
    try {
      const favorites = await prisma.favorite.findMany({
        where: { propertyId: parseInt(propertyId) },
        include: {
          user: true,
          property: true,
        },
      });
      return favorites;
    } catch (error) {
      throw new Error(`Error fetching property favorites: ${error.message}`);
    }
  },

  // Add favorite
  addFavorite: async (userId, propertyId) => {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!user) {
        throw new Error("User not found");
      }

      // Check if property exists
      const property = await prisma.property.findUnique({
        where: { id: parseInt(propertyId) },
      });
      if (!property) {
        throw new Error("Property not found");
      }

      // Create favorite
      const favorite = await prisma.favorite.create({
        data: {
          userId: parseInt(userId),
          propertyId: parseInt(propertyId),
        },
        include: {
          user: true,
          property: true,
        },
      });
      return favorite;
    } catch (error) {
      if (error.code === "P2002") {
        throw new Error("This property is already in favorites");
      }
      throw new Error(`Error adding favorite: ${error.message}`);
    }
  },

  // Remove favorite
  removeFavorite: async (userId, propertyId) => {
    try {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId: parseInt(userId),
            propertyId: parseInt(propertyId),
          },
        },
      });

      if (!favorite) {
        throw new Error("Favorite not found");
      }

      await prisma.favorite.delete({
        where: {
          userId_propertyId: {
            userId: parseInt(userId),
            propertyId: parseInt(propertyId),
          },
        },
      });

      return { message: "Favorite removed successfully" };
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Favorite not found");
      }
      throw new Error(`Error removing favorite: ${error.message}`);
    }
  },

  // Remove favorite by ID
  removeFavoriteById: async (id) => {
    try {
      const favorite = await prisma.favorite.delete({
        where: { id: parseInt(id) },
      });
      return { message: "Favorite removed successfully", favorite };
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Favorite not found");
      }
      throw new Error(`Error removing favorite: ${error.message}`);
    }
  },
};

module.exports = favoriteService;

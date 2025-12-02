const favoriteService = require("../services/favorite.service");

const favoriteController = {
  // Get all favorites
  getAllFavorites: async (req, res, next) => {
    try {
      const favorites = await favoriteService.getAllFavorites();
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  },

  // Get favorite by ID
  getFavoriteById: async (req, res, next) => {
    try {
      const favorite = await favoriteService.getFavoriteById(req.params.id);
      res.json(favorite);
    } catch (error) {
      if (error.message === "Favorite not found") {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  },

  // Get favorites by user ID
  getFavoritesByUserId: async (req, res, next) => {
    try {
      const favorites = await favoriteService.getFavoritesByUserId(
        req.params.userId
      );
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  },

  // Get favorites by property ID
  getFavoritesByPropertyId: async (req, res, next) => {
    try {
      const favorites = await favoriteService.getFavoritesByPropertyId(
        req.params.propertyId
      );
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  },

  // Add favorite
  addFavorite: async (req, res, next) => {
    try {
      const { userId, propertyId } = req.body;

      if (!userId || !propertyId) {
        return res
          .status(400)
          .json({ error: "userId and propertyId are required" });
      }

      const favorite = await favoriteService.addFavorite(userId, propertyId);
      res.status(201).json(favorite);
    } catch (error) {
      if (
        error.message === "User not found" ||
        error.message === "Property not found"
      ) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "This property is already in favorites") {
        return res.status(409).json({ error: error.message });
      }
      next(error);
    }
  },

  // Remove favorite by ID
  removeFavoriteById: async (req, res, next) => {
    try {
      const result = await favoriteService.removeFavoriteById(req.params.id);
      res.json(result);
    } catch (error) {
      if (error.message === "Favorite not found") {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  },

  // Remove favorite by user and property
  removeFavorite: async (req, res, next) => {
    try {
      const result = await favoriteService.removeFavorite(
        req.params.userId,
        req.params.propertyId
      );
      res.json(result);
    } catch (error) {
      if (error.message === "Favorite not found") {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  },
};

module.exports = favoriteController;

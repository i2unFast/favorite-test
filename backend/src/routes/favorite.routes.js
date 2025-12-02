const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorite.controller");

// GET /api/favorites - Get all favorites
router.get("/", favoriteController.getAllFavorites);

// GET /api/favorites/:id - Get favorite by ID
router.get("/:id", favoriteController.getFavoriteById);

// GET /api/favorites/user/:userId - Get favorites by user ID
router.get("/user/:userId", favoriteController.getFavoritesByUserId);

// GET /api/favorites/property/:propertyId - Get favorites by property ID
router.get(
  "/property/:propertyId",
  favoriteController.getFavoritesByPropertyId
);

// POST /api/favorites - Add favorite
router.post("/", favoriteController.addFavorite);

// DELETE /api/favorites/:id - Remove favorite by ID
router.delete("/:id", favoriteController.removeFavoriteById);

// DELETE /api/favorites/user/:userId/property/:propertyId - Remove favorite by user and property
router.delete(
  "/user/:userId/property/:propertyId",
  favoriteController.removeFavorite
);

module.exports = router;

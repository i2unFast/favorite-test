const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

// GET /api/properties - Get all properties
router.get("/", propertyController.getAllProperties);

// GET /api/properties/:id - Get property by ID
router.get("/:id", propertyController.getPropertyById);

// POST /api/properties - Create new property
router.post("/", propertyController.createProperty);

// PUT /api/properties/:id - Update property
router.put("/:id", propertyController.updateProperty);

// DELETE /api/properties/:id - Delete property
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;

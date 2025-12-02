const prisma = require("../db/prisma");

const propertyController = {
  // Get all properties
  getAllProperties: async (req, res, next) => {
    try {
      const properties = await prisma.property.findMany();
      res.json(properties);
    } catch (error) {
      next(error);
    }
  },

  // Get property by ID
  getPropertyById: async (req, res, next) => {
    try {
      const property = await prisma.property.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      next(error);
    }
  },

  // Create new property
  createProperty: async (req, res, next) => {
    try {
      const { title, imageUrl, location, price } = req.body;

      if (!title || !imageUrl || !location || price === undefined) {
        return res.status(400).json({
          error: "Missing required fields: title, imageUrl, location, price",
        });
      }

      const property = await prisma.property.create({
        data: {
          title,
          imageUrl,
          location,
          price: parseFloat(price),
        },
      });
      res.status(201).json(property);
    } catch (error) {
      next(error);
    }
  },

  // Update property
  updateProperty: async (req, res, next) => {
    try {
      const { title, imageUrl, location, price } = req.body;
      const updateData = {};

      if (title) updateData.title = title;
      if (imageUrl) updateData.imageUrl = imageUrl;
      if (location) updateData.location = location;
      if (price !== undefined) updateData.price = parseFloat(price);

      const property = await prisma.property.update({
        where: { id: parseInt(req.params.id) },
        data: updateData,
      });
      res.json(property);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Property not found" });
      }
      next(error);
    }
  },

  // Delete property
  deleteProperty: async (req, res, next) => {
    try {
      const property = await prisma.property.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Property deleted successfully", property });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Property not found" });
      }
      next(error);
    }
  },
};

module.exports = propertyController;

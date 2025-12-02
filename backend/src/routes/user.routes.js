const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// GET /api/users - Get all users (for dropdown)
router.get("/", userController.getAllUsers);

module.exports = router;

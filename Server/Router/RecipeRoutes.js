const express = require("express");
const router = express.Router();
const { RecipeControllerHandler, upload } = require("../Controllers/RecipeController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.post("/Recipes",RecipeControllerHandler);
module.exports = router;
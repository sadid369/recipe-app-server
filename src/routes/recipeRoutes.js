const express = require("express");
const controller = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");
// const Recipe = require("../models/recipes");

const router = express.Router();

router.get("/", controller.getAllRecipes);
router.post("/", authMiddleware, controller.createRecipe);
router.put("/", authMiddleware, controller.saveRecipes);
router.get("/savedRecipes/ids/:userID", controller.getUserRecipe);
router.get("/savedRecipes/:userID", controller.getAllRecipeCreatedByUser);

module.exports = router;

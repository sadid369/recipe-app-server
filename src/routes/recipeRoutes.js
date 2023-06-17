const express = require("express");
const controller = require("../controllers/recipeController");
// const Recipe = require("../models/recipes");

const router = express.Router();

router.get("/", controller.getAllRecipes);
router.post("/", controller.createRecipe);
router.put("/", controller.saveRecipes);
router.get("/savedRecipes/ids", controller.getUserRecipe);
router.get("/savedRecipes", controller.getAllRecipeCreatedByUser);

module.exports = router;

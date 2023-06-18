const mongoose = require("mongoose");
const Recipe = require("../models/recipes");
const User = require("../models/users");

exports.getAllRecipes = async (req, res, next) => {
  try {
    const response = await Recipe.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "Something wrong happen", error });
  }
};
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
    });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: "Something wrong happen", error });
  }
};
exports.saveRecipes = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeID);
    const user = await User.findById(req.body.userID);
    user.savedRecipes.push([`${recipe._id}`]);
    await user.save();

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(400).json({ error: "Something wrong happen", error });
  }
};
exports.getUserRecipe = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);
    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(400).json({ error: "Something wrong happen", error });
  }
};
exports.getAllRecipeCreatedByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(400).json({ error: "Something wrong happen", error });
  }
};

// exports.getAllRecipes = async (req, res, next) => {};
// exports.getAllRecipes = async (req, res, next) => {};
// exports.getAllRecipes = async (req, res, next) => {};
// exports.getAllRecipes = async (req, res, next) => {};

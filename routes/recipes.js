const express = require("express");
const {
  getRecipes,
  getRecipesByTag,
  getSingleRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes");

const router = express.Router();

// Include other resource routers

const ratingRouter = require("./ratings");

// Re-route into other resource routers
router.use("/:recipeId/ratings", ratingRouter);

const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getRecipes, getRecipesByTag).post(protect, addRecipe);

router
  .route("/:id")
  .get(getSingleRecipe)
  .put(protect, authorize("admin"), updateRecipe)
  .delete(protect, authorize("admin"), deleteRecipe);

module.exports = router;

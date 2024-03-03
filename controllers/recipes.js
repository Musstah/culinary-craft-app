const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Recipe = require("../models/Recipe");

// @desc    Get all recipes
// @route   GET /api/v1/recipes
// @access  Public
exports.getRecipes = asyncHandler(async (req, res, next) => {
  if (req.query.tags) {
    const tags = req.query.tags;
    const recipes = await Recipe.find({ tags: { $all: tags } }).exec();

    if (!recipes) {
      return next(
        new ErrorResponse(`Recipes not found with tags of ${tags}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } else if (req.query.name) {
    const nameQuery = req.query.name;
    console.log(nameQuery);
    const recipes = await Recipe.find({ name: nameQuery }).exec();

    if (!recipes) {
      return next(
        new ErrorResponse(
          `Recipes not found with name of  of ${nameQuery}`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } else {
    const recipes = await Recipe.find();
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  }
});

// @desc    Get single recipe
// @route   GET /api/v1/recipes/:id
// @access  Public
exports.getSingleRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: recipe,
  });
});

// @desc    Get recipes by tags
// @route   GET /api/v1/recipes
// @access  Public
exports.getRecipesByTag = asyncHandler(async (req, res, next) => {
  const tags = req.query.tags;
  const recipes = await Recipe.find({ tags: { $all: tags } }).exec();

  if (!recipes) {
    return next(
      new ErrorResponse(`Recipes not found with tags of ${req.query.tags}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: recipes,
  });
});

// @desc    Add new recipe
// @route   POST /api/v1/recipes
// @access  Private
exports.addRecipe = asyncHandler(async (req, res, next) => {
  // Add creator to req.body
  req.body.creator = req.user.id;

  // Check for added recipes for a specific user
  const addedRecipe = await Recipe.findOne({ user: req.user.id });

  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    data: recipe,
  });
});

// @desc    Update recipe
// @route   PUT /api/v1/recipes/:id
// @access  Private
exports.updateRecipe = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is the creator of recipe
  if (recipe.creator.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not the creator of the recipe`,
        401
      )
    );
  }

  recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: recipe });
});

// @desc    Delete recipe
// @route   Delete /api/v1/recipes/:id
// @access  Private
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is the creator of recipe
  if (recipe.creator.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not the creator of the recipe`,
        401
      )
    );
  }

  await Recipe.deleteOne({ _id: req.params.id });

  res.status(200).json({ success: true, data: {} });
});

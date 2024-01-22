const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Rating = require("../models/Rating");
const Recipe = require("../models/Recipe");

// @desc     Get ratings
// @route    GET /api/v1/ratings
// @route    GET /api/v1/recipes/:recipeId/ratings
// @access   Public

exports.getRatings = asyncHandler(async (req, res, next) => {
  if (req.params.recipeId) {
    const ratings = await Rating.find({ recipe: req.params.recipeId });

    return res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings,
    });
  } else {
    const ratings = await Rating.find();
    res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings,
    });
  }
});

// @desc     Get singe rating
// @route    GET /api/v1/ratings/:id
// @access   Public

exports.getRating = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findById(req.params.id).populate({
    path: "recipe",
    select: "name",
  });

  if (!rating) {
    return next(
      new ErrorResponse(`No rating found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: rating,
  });
});

// @desc     Add rating
// @route    POST /api/v1/recipes/:recipeId/ratings
// @access   Private

exports.addRating = asyncHandler(async (req, res, next) => {
  req.body.recipe = req.params.recipeId;
  req.body.user = req.user.id;

  const recipe = await Recipe.findById(req.params.recipeId);

  if (!recipe) {
    return next(
      new ErrorResponse(`No recipe with the id of ${req.params.recipeId}`, 404)
    );
  }

  const rating = await Rating.create(req.body);

  res.status(201).json({
    success: true,
    data: rating,
  });
});

// @desc     Update rating
// @route    PUT /api/v1/ratings/:id
// @access   Private

exports.updateRating = asyncHandler(async (req, res, next) => {
  let rating = await Rating.findById(req.params.id);

  if (!rating) {
    return next(
      new ErrorResponse(`No rating with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure rating belongs to user or it's being changed by an admin
  if (rating.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update rating`, 401));
  }

  rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: rating,
  });
});

// @desc     Delete rating
// @route    DELETE /api/v1/ratings/:id
// @access   Private

exports.deleteRating = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findById(req.params.id);

  if (!rating) {
    return next(
      new ErrorResponse(`No rating with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure rating belongs to user or it's being changed by an admin
  if (rating.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update rating`, 401));
  }

  await rating.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

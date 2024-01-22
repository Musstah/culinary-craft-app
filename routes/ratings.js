const express = require("express");
const {
  getRatings,
  getRating,
  addRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratings");

const Rating = require("../models/Rating");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getRatings)
  .post(protect, authorize("user", "admin"), addRating);

router
  .route("/:id")
  .get(getRating)
  .put(protect, authorize("user", "admin"), updateRating)
  .delete(protect, authorize("user", "admin"), deleteRating);

module.exports = router;

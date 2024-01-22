const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  ratingValue: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating (1 - 10)"],
  },
  recipe: {
    type: mongoose.Schema.ObjectId,
    ref: "Recipe",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Prevent user from submitting more than one review per recipe
RatingSchema.index({ recipe: 1, user: 1 }, { unique: true });

// Static method to get the avg rating of a recipe and save
RatingSchema.statics.getAverageRating = async function (recipeId) {
  const obj = await this.aggregate([
    {
      $match: { recipe: recipeId },
    },
    {
      $group: {
        _id: "$recipe",
        averageRating: { $avg: "$ratingValue" },
      },
    },
  ]);

  try {
    await this.model("Recipe").findByIdAndUpdate(recipeId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
RatingSchema.post("save", function () {
  this.constructor.getAverageRating(this.recipe);
});

// Call getAverageRating before remove
RatingSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.recipe);
});

module.exports = mongoose.model("Rating", RatingSchema);

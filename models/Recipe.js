const mongoose = require("mongoose");
const slugify = require("slugify");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
    maxlength: [80, "Name cannot be longer than 50 characters"],
  },
  slug: String,

  instructions: {
    type: String,
    required: [true, "Instructions are required"],
    maxlength: [800, "Instructions cannot be longer than 50 characters"],
  },
  img: {
    type: String,
    // match: [
    //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //   "Please use valid URL",
    // ],
  },
  ingredients: {
    type: Object,
    required: [true, "Add ingredients please"],
  },
  tags: {
    type: [String],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must not be more then 10"],
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  averageTime: Number,
  level: {
    type: String,
    require: true,
    enum: ["Beginner", "Intermediate", "Expert"],
  },
});

// Create slug and img url from the name
RecipeSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.img = `${this.name.split(" ").join("")}.jpg`;
  next();
});

// // Static method to get the avg rating of recipe
// RecipeSchema.statics.getAverageRating = async function(recipeId) {
//   const obj = await this.aggregate([{
//     $match: {recipe: recipeId}
//   }, {
//     $group: {
//       _id: '%recipe',
//       averageRating: {$avg: '$'}
//     }
//   }])
// }

module.exports = mongoose.model("Recipe", RecipeSchema);

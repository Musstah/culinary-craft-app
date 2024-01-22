const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load models
const Recipe = require("./models/Recipe");
const Rating = require("./models/Rating");

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSONs
const recipes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/recipes.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Recipe.create(recipes);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Recipe.deleteMany();
    await Rating.deleteMany();

    console.log("Data Deleted".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// prices.argv[2] = node seeder -i --> -i is the index two value
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}

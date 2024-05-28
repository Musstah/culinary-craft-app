const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");
const users = require("./routes/users");
const ratings = require("./routes/ratings");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Rate Limitng
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minds
  max: 2000,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
// app.use(
//   cors({
//     origin: "https://culinary-craft-app.vercel.app",
//     credentials: true,
//   })
// );

// Set static foler
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "_data/images")));

app.use(express.static(path.join(__dirname, "./frontend/build")));

// // any route that is not api will be redirected to index.html
// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );

// Dev loggin middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// if (process.env.NODE_ENV === "development") {
//   // set static folder
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   // any route that is not api will be redirected to index.html
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

// Mount routers
app.use("/api/v1/recipes", recipes);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/ratings", ratings);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

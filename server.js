const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

dotenv.config();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const villainsRoute = require("./routes/api/villains");

app.use("/villains", villainsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server up and running on port ${PORT}`)
);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const noteRoute = require("./routes/noteRoute");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;
const app = express();

const DB_URL = process.env.DB_URL;
// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(express.json());
app.use("/api/v1/", noteRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

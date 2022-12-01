const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;
const app = express();

const DB_URL = process.env.DB_URL;
// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user/", userRoute);
app.use("/api/emp/", employeeRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

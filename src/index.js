const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("../src/routes/userRoutes");
require("dotenv").config();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());
const mongoDBConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sadid:123457abc@cluster0.ewgqpdi.mongodb.net/recipes"
    );
    console.log("Mongodb Connection Successful");
  } catch (error) {
    console.log("Error to Connect MongoDB", error);
  }
};
app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.listen(port, () => {
  console.log("> Server is up and running on port : " + port);
  mongoDBConnection();
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

//MODULES
const workoutRoutes = require("./routes/workouts");

//CONFIG
const port = process.env.PORT;

//MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method + ": " + req.path);
  next();
});

app.use("/api/workouts", workoutRoutes);

//Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Start Server Listening
    app.listen(port, () =>
      console.log(`
Connected to database.
Listening on port ${port}!`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => res.send("Hello World!"));

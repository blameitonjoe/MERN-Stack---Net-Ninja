const mongoose = require("mongoose");
const Workout = require("./models/workoutModel");
require("dotenv").config();

const exercises = [
  "Back extension",
  "Bench press",
  "Bent-over row",
  "Biceps curl",
  "Chest fly",
  "Crunch",
  "Deadlift",
  "Lateral raise",
  "Leg curl",
  "Leg extension",
  "Leg press",
  "Leg raise",
  "Lunge",
  "Pull-down",
  "Pull-up",
  "Push-up",
  "Pushdown",
  "Russian twist",
  "Seated calf raise",
  "Shoulder press",
  "Shoulder shrug",
  "Squat",
  "Standing calf raise",
  "Triceps extension",
  "Upright row",
];
const weights = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120, 125,
];
const reps = [5, 10, 15, 20, 25, 30];

//Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to database.`);
  })
  .catch((error) => {
    console.log(error);
  });

const randomElement = (arr) => {
  const len = arr.length;
  const randomIx = Math.floor(Math.random() * len);
  return arr[randomIx];
};

const createDoc = () => {
  return {
    title: randomElement(exercises),
    load: randomElement(weights),
    reps: randomElement(reps),
  };
};
const seedDB = async () => {
  const newWorkouts = Array.from({ length: 10 }, (_, index) => createDoc());

  try {
    const deletedWorkouts = await Workout.deleteMany({});
    console.log(deletedWorkouts);
  } catch (error) {
    console.log(error.message);
  }
  try {
    const createdWorkouts = await Workout.create(newWorkouts);
    console.log(createdWorkouts);
  } catch (error) {
    console.log(error.message);
  }
};

seedDB();

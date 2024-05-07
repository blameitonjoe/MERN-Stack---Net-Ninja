const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET All
const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(allWorkouts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

//GET One
const getOneWorkout = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No workout found!" });
    }

    const oneWorkout = await Workout.findById(id);
    if (!oneWorkout) {
      return res.status(404).json({ error: "No workout found!" });
    }
    res.status(200).json(oneWorkout);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

//POST New one
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const newWorkout = await Workout.create({
      title: title,
      load: load,
      reps: reps,
    });
    res.status(200).json(newWorkout);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

//DELETE One
const deleteOneWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No workout found!" });
    }
    const deletedWorkout = await Workout.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedWorkout) {
      return res.status(400).json({ error: "No workout found!" });
    }
    res.status(200).json(deletedWorkout);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

//Patch Existing one
const updateOneWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found!" });
  }
  const propsToUpdate = { ...req.body };
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, propsToUpdate);
    if (!updatedWorkout) {
      return res.status(400).json({ error: "No workout found!" });
    }
    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  deleteOneWorkout,
  updateOneWorkout,
};

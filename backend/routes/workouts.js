const express = require('express');
const Workout = require('../models/workoutModel')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "GET a single workout" })
})

router.get('/:id', (req, res) => {
    res.json({ message: "GET a single workout" })
})

router.post('/', async (req, res) => {
    const {title,load,reps}   = req.body
    try {
        const newWorkout = await Workout.create({title:title,load:load,reps:reps})
        res.status(200).json(newWorkout)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error:error.message})
    }
})

router.delete('/:id', (req, res) => {
    res.json({ message: "DELETE a single workout" })
})

router.patch('/:id', (req, res) => {
    res.json({ message: "UPDATE(PATCH) a single workout" })
});

module.exports = router;
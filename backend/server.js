const express = require('express');
const app = express();
const workoutRoutes = require('./routes/workouts');
require('dotenv').config();


const port = process.env.PORT

//MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method+": "+req.path);
    next();
})

app.use('/api/workouts',workoutRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
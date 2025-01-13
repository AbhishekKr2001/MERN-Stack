const express = require('express');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/apps')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// name, description, release date, version, ratings, genre
const userSchema = new mongoose.Schema({
    name: String,
    description: String,
    releaseDate: Date,
    version: Number,
    ratings: Number,
    genre: String
});

const User = mongoose.model('User', userSchema);
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
})//http://localhost:3000/


app.post('/', async (req, res) => {
    const { name, description, releaseDate, version, ratings, genre } = req.body;

    try {
        const user = new User({ name, description, releaseDate, version, ratings, genre });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})/**http://localhost:3000/
{
    "name":"Instagram",
    "description":"post photo daily",
    "releaseDate":"2024-04-19T12:00:00Z",
    "version":"2",
     "ratings":"5",
      "genre":"social media"
} */



app.get('/name/:name', async (req, res) => {
    try {
        const user = await User.find({ name: req.params.name });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})//http://localhost:3000/github


app.get('/genre/:genre', async (req, res) => {
    try {
        const user = await User.find({ genre: req.params.genre });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})//http://localhost:3000/games




const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
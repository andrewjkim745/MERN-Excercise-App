const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const db = require('./models')



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: newPassword
        })
        res.json({ status: 'register successful' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate'})
    }
})

app.post('/login', async (req, res) => {

       const user = await db.User.findOne({ email: req.body.email })
        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
    
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                    exercises: user.exercises
                },
                'secret123'
            )
    
            return res.json({ status: 'ok', user: token })
        } else {
            return res.json({ status: 'error', user: false })
        }
    })

    app.get('/users', async (req, res) => {
        const token = req.headers['x-access-token']
    
        try {
            const decoded = jwt.verify(token, 'secret123')
            const email = decoded.email
            const user = await db.User.findOne({ email: email })
    
            return res.json({ status: 'ok', username: user.username })
        } catch (error) {
            console.log(error)
            res.json({ status: 'error', error: 'invalid token' })
        }
    })

    app.post('/users/:id', async (req, res) => {
        db.Exercise.create(req.body)
            .then(function(dbExercise) {
                return db.User.findOneAndUpdate({_id: req.params.id }, {$push: {exercises: dbExercise._id}}, { new: true});
            })
            .then(function(dbUser) {
                res.json(dbUser);
            })
            .catch(function(err) {
                res.json(err);
            })
    })

    app.get('/users/:id', async (req, res) => {
        db.User.findOne({_id: req.params.id })
        .populate('exercises')
        .then(function(dbUser) {
            res.json(dbUser);
        })
        .catch(function(err) {
            res.json(err)
        })
    })
    
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})



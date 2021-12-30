const express = require('express');
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const db = require('./models')



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
console.log(process.env.PORT)

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

app.use('/api/exercises', exercisesRouter);
app.use('/api/users', usersRouter);

app.post('/api/register', async (req, res) => {
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

app.post('/api/login', async (req, res) => {
    console.log(req.body)
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

    app.get('/api/users', async (req, res) => {
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

    app.post('/api/users/:id', async (req, res) => {
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

    app.get('/api/users/:id', async (req, res) => {
        db.User.findOne({_id: req.params.id })
        .populate('exercises')
        .then(function(dbUser) {
            res.json(dbUser);
        })
        .catch(function(err) {
            res.json(err)
        })
    })
    if (process.env.NODE_ENV === "production") {
        // Express will serve up production assets
        app.use(express.static("build"));
      
        // Express will serve up the front-end index.html file if it doesn't recognize the route
        app.get("*", (req, res) =>
          res.sendFile(path.resolve("build", "index.html"))
        );
      }
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})



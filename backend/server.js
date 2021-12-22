const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


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
const User = require('./models/user.model');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ status: 'register successful' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate'})
    }
})

app.post('/login', async (req, res) => {

    console.log(req.body)
       const user = await User.findOne({ email: req.body.email, })
        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }

        if (user) {
            return res.json({ status: 'login successful', user: true })
        } else {
            return res.json({ status:'error', user:false})
        }
    })

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})



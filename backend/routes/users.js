const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('What is the Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password_digest = req.body.password_digest
  const email = req.body.email

  const newUser = new User({username, password_digest, email});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
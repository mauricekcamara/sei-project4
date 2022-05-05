const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../../models/users');
const router = express.Router();
const userValidator = require('./user_validator');
const isLoggedIn = require('../../middleware/is_logged_in');

// Get a user
router.get('/:id', isLoggedIn, (req, res) => {
    Users.getById(req.params.id).then((user) => {
        res.json(user);
    });
});

// Get all users, name only
router.get(
    '/',
    /*, isLoggedIn*/ (req, res) => {
        console.log(req.query);
        Users.getAll(/*req.session.userId*/ req.query.user).then((users) => {
            res.json(users);
        });
    }
);

// Create a user
router.post('/', userValidator, (req, res) => {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(
        newUser.password.toString(),
        bcrypt.genSaltSync()
    );
    Users.create(newUser)
        .then(({ password, ...user }) => {
            if (!user) {
                return res.status(500).json({
                    message: 'Error when creating user... Please try again',
                });
            }
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.name = user.name;
            res.json(user);
        })
        .catch((error) => {
            throw error;
            if (error.code == '23505') {
                return res.status(500).json({
                    message: 'Error 20: cannot create user. Please try again',
                });
            } else {
                // return res.status(500).json({
                //     message: `Error: ${error.code}`,
                // });
                throw error;
            }
        });
});

module.exports = router;

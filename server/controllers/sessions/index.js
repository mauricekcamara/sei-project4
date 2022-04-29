const express = require('express');
const Users = require('../../models/users');
const bcrypt = require('bcrypt');
const router = express.Router();

// Routes
// 1. Create session (login)
router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    function incorrectResponse(res) {
        res.status(400).json({
            message: 'Incorrect email or password',
        });
    }
    Users.getByEmail(email)
        .then((user) => {
            const valid = user && bcrypt.compareSync(password, user.password);
            if (valid) {
                req.session.userId = user.id;
                req.session.email = user.email;
                req.session.name = user.name;
                res.json({
                    userId: user.id,
                    email: email,
                });
            } else {
                incorrectResponse(res);
            }
        })
        .catch((error) => {
            incorrectResponse(res);
        });
});
// 2. Get Session
router.get('/', (req, res) => {
    // If Logged in Check
    if (req.session.email) {
        res.json({
            userId: req.session.userId,
            email: req.session.email,
            name: req.session.name,
        });
    } else {
        // 401 - Unauthorized
        res.status(401).json({
            message: 'Not logged in',
        });
    }
});
// 3. Delete session (logout)
router.delete('/', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

module.exports = router;

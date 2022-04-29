const Users = require('../../models/users');

const userValidator = (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({
            message: 'Email is required',
        });
    }
    if (!req.body.name) {
        return res.status(400).json({
            message: 'Name is required',
        });
    }
    if (req.body.password.length < 3) {
        return res.status(400).json({
            message: 'Password must be longer than 3 characters',
        });
    }
    if (Users.getByEmail(req.body.email) == '') {
        return res.status(400).json({ message: 'Email already exists' });
    }
    next();
};

module.exports = userValidator;

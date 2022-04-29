const isLoggedIn = (req, res, next) => {
    if (!req.session.email) {
        return res.status(401).json({
            message: 'Please log in to perform this action',
        });
    }

    next();
};

module.exports = isLoggedIn;

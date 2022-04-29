const express = require('express');
const Friends = require('../../models/friends');
//const isLoggedIn = require('../../middleware/is_logged_in')
const router = express.Router();

// Get all Friends
router.get('/', (req, res) => {
    Friends.getAllFriends(/*req.session.userId*/).then((friends) => {
        res.json(friends);
    });
});

// Add a user to the friends list
router.post('/', (req, res) => {
    const newFriend = req.body;
    Friends.create(newFriend).then((friend) => {
        if (!friend) {
            return res.status(500).json({
                message: 'Error when adding friend... Please try again',
            });
        }
        res.json(friend);
    });
});
// Delete a friend from list
router.delete(
    '/:id',
    /*isLoggedIn*/ (req, res) => {
        Friends.delete(req.params.id /*, req.session.userId*/).then(() => {
            res.json({ status: 'ok' });
        });
    }
);

module.exports = router;

const db = require('../database/db');

const Friends = {
    create: ({ friend_id, user_id }) => {
        const query =
            'INSERT INTO friends (friend_id, user_id) VALUES($1, $2) RETURNING *';

        return db
            .query(query, [friend_id, user_id])
            .then((response) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            })
            .catch((error) => {
                throw error;
            });
    },
    getAllFriends: (user_id) => {
        const query =
            'SELECT friends.id, users.name from friends INNER JOIN users on users.id = friends.friend_id where friends.user_id = $1';
        return db.query(query, [user_id]).then((response) => {
            return response.rows;
        });
    },
    delete: (id, user_id) => {
        const query = `DELETE FROM friends WHERE id = $1 and user_id = $2`;
        return db.query(query, [id, user_id]);
    },
};

module.exports = Friends;

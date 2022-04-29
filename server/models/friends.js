const db = require('../database/db');

const Friends = {
    create: ({ user_id }) => {
        const query = 'INSERT INTO friends (user_id) VALUES($1) RETURNING *';

        return db
            .query(query, [user_id])
            .then((response) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            })
            .catch((error) => {
                throw error;
            });
    },
    getAllFriends: () => {
        const query =
            'SELECT friends.user_id, users.id, users.name from friends INNER JOIN users on users.id = friends.user_id';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
    delete: (id, user_id) => {
        const query = `DELETE FROM friends WHERE id = $1 and user_id = $2`;
        return db.query(query, [id, user_id]);
    },
};

module.exports = Friends;

const db = require('../database/db');

const Users = {
    create: ({ name, email, password, admin = false }) => {
        const query =
            'INSERT INTO users (name, email, password, admin) VALUES($1, $2, $3, $4) RETURNING *';

        return db
            .query(query, [name, email, password, admin])
            .then((response) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            })
            .catch((error) => {
                throw error;
            });
    },

    getByEmail: (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        return db.query(query, [email]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },

    getById: (id) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },

    getAll: () => {
        const query = 'SELECT id, name FROM users';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
};

module.exports = Users;

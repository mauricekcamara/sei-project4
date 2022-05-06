if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const path = require('path');

const PORT =
    process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001;

const express = require('express');
const pg = require('pg');
const app = express();
const cors = require('cors');
const session = require('express-session');
//const db = require('./database/db');

app.use(
    session({
        secret: 'supersecretpassword', // CHANGE THIS TO AN ENV VARIABLE
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

// Middleware
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

// Controller imports
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const friendsController = require('./controllers/friends');

// Controllers
app.use('/api/users', usersController);
app.use('/api/sessions', sessionsController);
app.use('/api/friends', friendsController);
// app.listen(5000, () => {
//     console.log('Server has started on port 5000');
// });
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(
            path.join(__dirname, '..', 'client', 'build', 'index.html')
        );
    });
}

app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

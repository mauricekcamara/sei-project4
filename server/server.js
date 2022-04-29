const express = require('express');
import path from 'path';
const pg = require('pg');
const app = express();
const cors = require('cors');
const session = require('express-session');
//const db = require('./database/db');

app.set('trust proxy', 1);
app.use(
    session({
        secret: 'supersecretpassword', // CHANGE THIS TO AN ENV VARIABLE
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

// Middleware
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
app.listen(5000, () => {
    console.log('Server has started on port 5000');
});

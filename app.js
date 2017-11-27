const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const config = require('./config/configuration');
const users = require('./routes/users');

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

// Initial passport and settings
passport.authenticate('jwt', { session: false });
app.use(passport.initialize());

// Definition of variables
require('./config/passport')(passport);

// Static folders
app.use(express.static(path.join(__dirname, 'public')));

// Routes definition
app.use('/users', users);
app.get('/', function (req, res) {
    console.log('Invalid endpoint!');
});
app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname, 'index.html'));
});

// Database connection
mongoose.connect(config.database, {
    useMongoClient: true
});

// Database event handler
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Start server
app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}!`);
});
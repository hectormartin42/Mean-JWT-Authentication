const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/configuration');

// Register
router.post('/register', (req, res, next) => {

    if (!req.body.email || !req.body.password)
        return res.status(200).send({
            success: false,
            message: 'Please enter email and password.'
        });

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, (err, user) => {
        if (err)
             res.status(200).send({
                success: false,
                message: 'That email address already exists.'
            });
        else
             res.status('201').send({
                success: true,
                msg: 'User was registered'
            });
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign({
                        data: user
                    }, config.secret);
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user : user
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;
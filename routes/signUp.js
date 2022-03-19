/**
 * This router handles all the sign up process, whether it was accepted, denied, or there was something wrong with the password
 */

const mongoose = require('mongoose');
const express = require("express");
const signUpRouter = express.Router();
const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");

signUpRouter.use(bodyParser.urlencoded({ extended: true }));
signUpRouter.use(express.json());

// This is what gets us connected to the mongoDB: futbolcluster
mongoose.connect('mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// This checks to make sure we have a good connection
const db = mongoose.connection;

// This post will add a user 
signUpRouter.post('/', [check('name', 'Username cannot be empty!').exists().isLength({ min: 3 }),
        check('email')
        .isEmail()
        .normalizeEmail(),
        check('password', 'Password must contain at least 8 characters')
        .exists()
        .isLength({ min: 8 })
        .custom((val, { req, loc, path }) => {
            if (val != req.body.password_confirmation) {
                throw new Error("Password does not match.");
            } else {
                return validationResult;
            }
        }),
        check('password_confirmation', 'Password does not match')
        .exists()
        .isLength({ min: 8 })
    ],
    function(req, res, next) {
        var errors = validationResult(req);
        const alert = errors.array();
        var userAdded = false;

        // if the validator caught some errors then this will render the new page and send
        // an array of the errors it caught. It will then go through a for loop to put each
        // of the errors in their own alert for the user to see. 
        if (!errors.isEmpty()) {
            res.render('index', { alert });
            // If there are no errors then we will get the user input and send that to the database
            // and create an instance of users for the user (i.e. create them an account).
        } else {
            userAdded = true;
            console.log("This is the length of the alert: " + alert.length);
            var user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            };

            console.log("This is my email: " + user.email);

            db.collection("users").insertOne(user, function(err, result) {
                console.log("item inserted");
                db.close();
            });

            res.render('index', { userAdded });
        }

    });

module.exports = signUpRouter;
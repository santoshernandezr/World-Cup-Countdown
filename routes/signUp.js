/**
 * This router handles all the sign up process, whether it was accepted, denied, or there was something wrong with the password
 */

const mongoose = require('mongoose');
const express = require("express");
const signUpRouter = express.Router();
const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");

var USER_ADDED = "You account has been successfully made!";

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
        // var userAdded = null;

        if (!errors.isEmpty()) {
            res.render('index', { alert });
        } else {
            var user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            };

            db.collection("users").insertOne(user, function(err, result) {
                console.log("item inserted");
                db.close();
            });

            // const userAdded = USER_ADDED;

            // res.render('index', { userAdded });
            res.redirect('/');
        }
    });

module.exports = signUpRouter;
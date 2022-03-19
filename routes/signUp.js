/**
 * This router handles all the sign up process, whether it was accepted, denied, or there was something wrong with the password
 */

const mongoose = require('mongoose');
const express = require("express");
const signUpRouter = express.Router();
const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const assert = require('assert');

signUpRouter.use(bodyParser.urlencoded({ extended: true }));
signUpRouter.use(express.json());

const url = 'mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority';

// This is what gets us connected to the mongoDB: futbolcluster
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
        var alert = errors.array();
        var userAdded = true;

        // if the validator caught some errors then this will render the new page and send
        // an array of the errors it caught. It will then go through a for loop to put each
        // of the errors in their own alert for the user to see. 
        if (!errors.isEmpty()) {
            res.render('index', { alert });
            // If there are no errors then we will get the user input and send that to the database
            // and create an instance of users for the user (i.e. create them an account).
        } else {
            // Pass in the name, email, password, and password confirmation passed in by the user in an array
            var user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            };

            mongoose.connect(url, function(err, db) {
                assert.equal(null, err);

                var cursor = db.collection("users").find();

                cursor.forEach(function(doc, err) {
                    assert.equal(null, err);

                    // If the email is in the database then we set userAdded to false because we won't be adding a user
                    if (doc.email == user.email) {
                        console.log("DOC: " + doc.email + " " + "USER: " + user.email);
                        console.log("There is an existing account with this email");
                        userAdded = false;
                    }
                }, function() {
                    // If the email doesn't exist in the databse then we add a user to the database
                    if (userAdded) {
                        console.log("User will be added");
                        db.collection("users").insertOne(user, function(err, result) {
                            console.log("item inserted");
                            db.close();
                        });
                    }
                    res.render('index', { userAdded });
                });
            });
        }
    });

module.exports = signUpRouter;
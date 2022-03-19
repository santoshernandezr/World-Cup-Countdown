/**
 * This router handles all the sign up process, whether it was accepted, denied, or there was something wrong with the password
 */

const mongoose = require('mongoose');
const express = require("express");
const signInRouter = express.Router();
const { check } = require('express-validator');
const bodyParser = require("body-parser");
const assert = require('assert');

signInRouter.use(bodyParser.urlencoded({ extended: true }));
signInRouter.use(express.json());

const url = 'mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority';

// This is what gets us connected to the mongoDB: futbolcluster
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// This post will allow the user to sign in
signInRouter.post('/', [check('email').isEmail().normalizeEmail(),
        check('password', 'Password must contain at least 8 characters')
        .exists()
        .isLength({ min: 8 })
    ],
    function(req, res, next) {
        // Put the email and password that was passed in by the user in an array
        var user = {
            email: req.body.email,
            password: req.body.password
        };

        // connect to mongodb database
        mongoose.connect(url, function(err, db) {
            assert.equal(null, err);

            var cursor = db.collection("users").find();
            cursor.forEach(function(doc, err) {
                assert.equal(null, err);
                if (doc.email == user.email && doc.password == user.password) {
                    console.log("You have successfully signed in");
                } else if ((doc.email == user.email && doc.password != user.password) || (doc.email != user.email && doc.password == user.password)) {
                    console.log("You're email or password are incorrect");
                } else {
                    console.log("No user exists for this email");
                }
            }, function() {
                db.close();
                res.redirect('/');
            });
        });

    }
);

module.exports = signInRouter;
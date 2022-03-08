/**
 * This router handles all the page loading. (i.e going from home page to bracket page)
 */

const express = require("express");
const urlRouter = express.Router();

// This is for the bracket button, when this is clicked it will redirect to the bracket page
urlRouter.get("/bracket", (req, res) => {
    res.render('bracket');
});

// If you're outside the home page, this will redirect you back to the home page
urlRouter.get("/index", (req, res) => {
    res.render('index')
});

// This is the route that will take us to the 2014 worldcup page
urlRouter.get("/WorldCup2014", (req, res) => {
    res.render('WorldCup2014')
});

// This is the route that will take us to the 2018 worldcup page
urlRouter.get("/WorldCup2018", (req, res) => {
    res.render('WorldCup2018')
});

module.exports = urlRouter;
// imports
// const index = require('./routes/index');
const mongoose = require('mongoose');
const express = require("express");
const path = require('path');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 5501;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
// app.use('/index', index);


// This is what gets us connected to the mongoDB: futbolcluster
mongoose.connect('mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// This checks to make sure we have a good connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Succesfully connected");
});

// This will be for the homepage
app.get("/", (req, res) => {
    res.render('index');
});

// This is for the bracket button, when this is clicked it will redirect to the bracket page
app.get("/bracket", (req, res) => {
    res.render('bracket');
});

// If you're outside the home page, this will redirect you back to the home page
app.get("/index", (req, res) => {
    res.render('index')
});

// This is the route that will take us to the 2014 worldcup page
app.get("/WorldCup2014", (req, res) => {
    res.render('WorldCup2014')
});

// This is the route that will take us to the 2018 worldcup page
app.get("/WorldCup2018", (req, res) => {
    res.render('WorldCup2018')
});

let options = {
    dotfiles: "ignore", // allow, deny, ignore
    etag: true,
    extensions: ["htm", "html"],
    index: false,
    maxAge: "7d",
    redirect: false,
    setHeaders: function(res, path, stat) {
        res.set("x-timestamp", Date.now());
    }
}

// static files
app.use(express.static("public", options));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// This post will add a user 
app.post('/index', [check('name', 'Username cannot be empty!').exists().isLength({ min: 3 }),
        check('email').isEmail().normalizeEmail(),
        check('password', 'Password must contain at least 8 characters').exists().isLength({ min: 8 }),
        check('password_confirmation', 'Password does not match').exists().isLength({ min: 8 })
    ],
    function(req, res, next) {
        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            const alert = errors.array();
            res.render('index', { alert });
        } else {
            var user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            };

            db.collection("usermodels").insertOne(user, function(err, result) {
                console.log("item inserted");
                db.close();
            });

            res.redirect('/')
        }
    });

app.listen(port, function() {
    console.log('Server is running on port ' + port);
})
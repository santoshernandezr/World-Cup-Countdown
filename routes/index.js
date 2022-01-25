const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const mongo = require('mongodb');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

const db = 'mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority';

var url = 'mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority';

// this will be used in index.js
router.get('/', (req, res, next) => {
    // res.render(('index'));
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

router.post('/', function(req, res, next) {
    var item = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    };

    db.collection("usermodels").insertOne(item, function(err, result) {
        console.log("item inserted");
        db.close();
    });

    res.redirect('/')
});

module.exports = router;
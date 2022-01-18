var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb+srv://me:1206825Rs!!!@futbolcluster.k7r86.mongodb.net/FutbolCluster?retryWrites=true&w=majority';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/insert', function(req, res, next) {
    var item = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    };

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Users').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    res.redirect('/');
});

module.exports = router;
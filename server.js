const assert = require('assert');
const express = require("express");
const app = express();
const port = 5501;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// getting-started.js
const mongoose = require('mongoose');
const users = require("./models/users");

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

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
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

app.use(express.static("public", options));


app.post("/", function(req, res) {
    var item = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    };

    db.collection("usermodels").insertOne(item, function(err, result) {
        assert.equal(null, err);
        console.log("item inserted");
        db.close();
    });
    res.redirect('/')
});

app.listen(port, function() {
    console.log('Server is running on port ' + port);
})
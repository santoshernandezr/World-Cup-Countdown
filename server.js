const express = require("express");
const app = express();
const port = 8080;

// getting-started.js
const mongoose = require('mongoose');

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
})

app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

app.get("/homepage", (req, res) => {
    res.send("yay")
})
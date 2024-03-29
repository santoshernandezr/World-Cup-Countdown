// Require statements
const express = require("express");
const urlRouter = require('./routes/index');
const signUpRouter = require('./routes/signUp');
const signInRouter = require('./routes/signIn');
const bodyParser = require("body-parser");

const app = express();
const port = 5501;

// Use statements
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', urlRouter);
app.use('/signUp', signUpRouter);
app.use('/signIn', signInRouter);
app.set('view engine', 'ejs');

// This will be for the homepage
app.get("/", (req, res) => {
    res.render('index');
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

app.listen(port, function() {
    console.log('Server is running on port ' + port);
})
const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    password_confirmation: String
});

let User = mongoose.model('User', userSchema);

var findUser = function(email_inputed) {
    User.find({ email: email_inputed }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    });
}

module.exports = mongoose.model("users", userSchema);
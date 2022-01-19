const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    password_confirmation: {
        type: String,
    },
});

module.exports = mongoose.model("userModel", userSchema);
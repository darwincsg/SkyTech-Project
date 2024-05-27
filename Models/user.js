const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: String,
    firstname: String,
    lastname: String,
    email: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = mongoose.model("User", UserSchema);

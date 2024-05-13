var mongoose = require("mongoose");
    //passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    avatar: String,
    firstname: String,
    lastname: String,
    email: String,
    token: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

//UserSchema.plugin(passportLocalMongoose);                   //Adds method to the user

module.exports = mongoose.model("User", UserSchema,"Users");
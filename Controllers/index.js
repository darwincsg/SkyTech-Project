const User = require("../models/user");
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

router.use(express.json());

router.post("/register",function(req, res){

    const nUser ={ username, password, fristname, lastname, email, avatar } = req.body;

    const newUser = new User({username, fristname, lastname, email, avatar});


User.create(newUser);
return res.redirect("/login");
});

router.post("/login",function(req, res){
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    //do JWT here
    return res.redirect("/home");
});

module.exports = router;
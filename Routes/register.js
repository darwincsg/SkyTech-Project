const express = require("express");
const router = express.Router();

const User = require("../Models/user");

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get("/", function(req, res){
    res.render("register", {page: 'register.ejs'});

    const token = req.cookies.token;
    console.log(token);
});

router.post("/",function(req, res){

    const nUser ={ username, password, fristname, lastname, email, avatar } = req.body;

    const token = jwt.sign({username: username}, password, {expiresIn:'7d'});

    const newUser = new User({username, password,fristname, lastname, email, avatar});

    res.cookie('token', token, { httpOnly: true })

    User.create(newUser);
    return res.redirect("/");
});

module.exports = router;
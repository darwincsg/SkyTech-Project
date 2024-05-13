const express = require("express");
const router = express.Router();



router.get("/", function (req, res) {
    res.render("landing");
});



router.get("/register", function(req, res){
    res.render("register", {page: 'register.ejs'});
});

//router.post("/register",function(req, res){
//});


router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

//router.post("/login",function(req, res){
//});


module.exports = router;
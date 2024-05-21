const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../Models/user");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

router.use(cookieParser());
router.use(express.json());

router.get("/", function (req, res) {
    res.render("landing");
});
router.get("/login",function(req, res){
    res.render("login", {page: 'login'});
});

router.post("/login",async (req, res) =>{
    const { username, password } = req.body;
    
    try {
        const result = await User.findOne({username: username});
        
        const pass = result.password; 

        const token = req.cookies.token;
        if(pass === password){
            if (!token) {
                const token = jwt.sign({username: username}, pass, {expiresIn:'7d'});
                res.cookie('token', token, { httpOnly: true })
            }

            return res.redirect("/dashboard");
        }else{
            return res.json({status: "PASS ERRADA"});
        }

    } catch (error) {
        console.error('Error de busqueda:', error);
    }
});

module.exports = router;
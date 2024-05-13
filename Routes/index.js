const express = require("express");
const router = express.Router();

const verificarToken = require('../middleware/auth');

const User = require("../Models/user");
const mongoose = require("mongoose");

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
        
        if(pass === password){
            return res.redirect("/dashboard");
        }else{
            return res.json({status: "PASS ERRADA"});
        }

    } catch (error) {
        console.error('Error de busqueda:', error);
    }
});

module.exports = router;
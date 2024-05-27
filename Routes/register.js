const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

router.use(cookieParser());

router.get("/", function(req, res){
    res.render("register", {page: 'register.ejs'});
});

router.post("/", async function(req, res){
    try {
        const { username, password, firstname, lastname, email, avatar } = req.body;
        
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword, firstname, lastname, email, avatar });

        await User.create(newUser);
        
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true });

        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error registering new user.");
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../Models/user");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

router.use(cookieParser());
router.use(express.json());

router.get("/", function (req, res) {
    res.render("landing");
});

router.get("/login", function (req, res) {
    const error = req.query.error;  // Get the error query parameter
    res.render("login", { page: 'login', error: error });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            console.log("Invalid username");
            return res.redirect('/login?error=Invalid%20username'); // Redirect with error message
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Invalid password");
            return res.redirect('/login?error=Invalid%20password'); // Redirect with error message
        }

        console.log("User authenticated, generating token...");
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log("Token generated:", token);
        res.cookie('token', token, { httpOnly: true });

        return res.redirect("/dashboard");
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send("Error logging in.");
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ mensaje: "Token inválido" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: "Token inválido" });
    }
};

router.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

// Example of using the middleware
router.get("/dashboard", authenticateToken, (req, res) => {
    res.render("dashboard", { user: req.user });
});

module.exports = router;

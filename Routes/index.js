const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../Models/user");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

router.use(cookieParser());
router.use(express.json());

/**
 * GET /
 * 
 * Renders the landing page.
 * 
 * Input: None
 * Output: Renders 'landing' view
 */
router.get("/", function (req, res) {
    res.render("landing");
});

/**
 * GET /login
 * 
 * Renders the login page with optional error message.
 * 
 * Input: Query parameter 'error' (optional)
 * Output: Renders 'login' view with error message (if any)
 */
router.get("/login", function (req, res) {
    const error = req.query.error;  
    res.render("login", { page: 'login', error: error });
});

/**
 * POST /login
 * 
 * Handles user login.
 * 
 * Input: Request body containing 'username' and 'password'
 * Output: Redirects to '/dashboard' on success, or to '/login' with an error message on failure
 */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            console.log("Invalid username");
            return res.redirect('/login?error=Invalid%20username'); 
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Invalid password");
            return res.redirect('/login?error=Invalid%20password'); 
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

/**
 * Middleware: authenticateToken
 * 
 * Authenticates the JWT token from cookies.
 * 
 * Input: Request cookies containing 'token'
 * Output: Adds 'user' to request object on success, or responds with 403 status on failure
 */
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

/**
 * GET /logout
 * 
 * Logs out the user by clearing the JWT token cookie.
 * 
 * Input: None
 * Output: Redirects to '/login'
 */
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

/**
 * GET /dashboard
 * 
 * Renders the dashboard page. Uses authenticateToken middleware to verify JWT.
 * 
 * Input: None
 * Output: Renders 'dashboard' view with user data
 */
router.get("/dashboard", authenticateToken, (req, res) => {
    res.render("dashboard", { user: req.user });
});

module.exports = router;

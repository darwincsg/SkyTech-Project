const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("dashboard", { user: req.user });
    } catch (err) {
        console.error("Error loading dashboard:", err);
        res.status(500).send("Error loading dashboard");
    }
});

module.exports = router;

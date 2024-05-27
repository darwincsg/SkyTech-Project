const express = require("express");
const router = express.Router();
const Part = require("../Models/part");

router.get("/", async (req, res) => {
    try {
        const parts = await Part.find();
        res.render("parts", { parts: parts });
    } catch (err) {
        res.status(500).send("Error retrieving parts");
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, quantity, description } = req.body;
        const newPart = new Part({ name, quantity, description });
        await newPart.save();
        res.redirect("/parts");
    } catch (err) {
        res.status(500).send("Error adding part");
    }
});

router.post("/update/:id", async (req, res) => {
    try {
        const { name, quantity, description } = req.body;
        await Part.findByIdAndUpdate(req.params.id, { name, quantity, description });
        res.redirect("/parts");
    } catch (err) {
        res.status(500).send("Error updating part");
    }
});

router.post("/delete/:id", async (req, res) => {
    try {
        await Part.findByIdAndDelete(req.params.id);
        res.redirect("/parts");
    } catch (err) {
        res.status(500).send("Error deleting part");
    }
});

router.post("/increment/:id", async (req, res) => {
    try {
        await Part.findByIdAndUpdate(req.params.id, { $inc: { quantity: 1 } });
        res.redirect("/parts");
    } catch (err) {
        res.status(500).send("Error incrementing part quantity");
    }
});

router.post("/decrement/:id", async (req, res) => {
    try {
        await Part.findByIdAndUpdate(req.params.id, { $inc: { quantity: -1 } });
        res.redirect("/parts");
    } catch (err) {
        res.status(500).send("Error decrementing part quantity");
    }
});

module.exports = router;

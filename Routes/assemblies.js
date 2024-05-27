const express = require("express");
const router = express.Router();
const Assembly = require("../Models/assembly");
const Part = require("../Models/part");

router.get("/", async (req, res) => {
    try {
        const assemblies = await Assembly.find().populate('parts');
        const parts = await Part.find();
        res.render("assemblies", { assemblies: assemblies, parts: parts });
    } catch (err) {
        res.status(500).send("Error retrieving assemblies");
    }
});

router.post("/", async (req, res) => {
    try {
        const { parts } = req.body;
        const newAssembly = new Assembly({ parts: parts });
        await newAssembly.save();
        res.redirect("/assemblies");
    } catch (err) {
        res.status(500).send("Error creating assembly");
    }
});

router.post("/delete/:id", async (req, res) => {
    try {
        await Assembly.findByIdAndDelete(req.params.id);
        res.redirect("/assemblies");
    } catch (err) {
        res.status(500).send("Error deleting assembly");
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Part = require("../Models/part");
const Drone = require("../Models/drone");

const generateDroneId = () => {
    return 'DRONE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

router.get("/", async (req, res) => {
    try {
        const motors = await Part.findOne({ name: "Motor" });
        const helices = await Part.findOne({ name: "Helice" });
        const batteries = await Part.findOne({ name: "Bateria" });

        const motorsCount = motors ? motors.quantity : 0;
        const helicesCount = helices ? helices.quantity : 0;
        const batteriesCount = batteries ? batteries.quantity : 0;

        const maxDrones = Math.min(
            Math.floor(motorsCount / 4),
            Math.floor(helicesCount / 16),
            Math.floor(batteriesCount / 1)
        );

        const drones = await Drone.find();
        res.render("assemble", {
            error: null,
            drones: drones,
            motorsCount: motorsCount,
            helicesCount: helicesCount,
            batteriesCount: batteriesCount,
            maxDrones: maxDrones
        });
    } catch (err) {
        res.status(500).send("Error loading assemble page");
    }
});

router.post("/", async (req, res) => {
    try {
        const motors = await Part.findOne({ name: "Motor" });
        const helices = await Part.findOne({ name: "Helice" });
        const batteries = await Part.findOne({ name: "Bateria" });

        const motorsCount = motors ? motors.quantity : 0;
        const helicesCount = helices ? helices.quantity : 0;
        const batteriesCount = batteries ? batteries.quantity : 0;

        console.log(`Motors available: ${motorsCount}`);
        console.log(`Helices available: ${helicesCount}`);
        console.log(`Batteries available: ${batteriesCount}`);

        const maxDrones = Math.min(
            Math.floor(motorsCount / 4),
            Math.floor(helicesCount / 16),
            Math.floor(batteriesCount / 1)
        );

        console.log(`Max drones that can be assembled: ${maxDrones}`);

        if (maxDrones > 0) {
            motors.quantity -= maxDrones * 4;
            helices.quantity -= maxDrones * 16;
            batteries.quantity -= maxDrones * 1;

            await motors.save();
            await helices.save();
            await batteries.save();

            for (let i = 0; i < maxDrones; i++) {
                const drone = new Drone({ droneId: generateDroneId() });
                await drone.save();
            }
        }

        const drones = await Drone.find();
        res.render("assemble", {
            error: `Assembled ${maxDrones} drones.`,
            drones: drones,
            motorsCount: motorsCount,
            helicesCount: helicesCount,
            batteriesCount: batteriesCount,
            maxDrones: maxDrones
        });
    } catch (err) {
        res.status(500).send("Error assembling drones");
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        const { droneId, date } = req.body;
        await Drone.findByIdAndUpdate(req.params.id, { droneId, date });
        res.redirect("/assemble");
    } catch (err) {
        res.status(500).send("Error editing drone");
    }
});

router.post("/delete/:id", async (req, res) => {
    try {
        await Drone.findByIdAndDelete(req.params.id);
        res.redirect("/assemble");
    } catch (err) {
        res.status(500).send("Error deleting drone");
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Part = require('../Models/part');
const Assembly = require('../Models/assembly');
const Drone = require('../Models/drone');

router.get('/', async (req, res) => {
    try {
        // Fetch all parts
        const parts = await Part.find();
        console.log('Parts:', parts);

        // Calculate the part with the least quantity
        const leastParts = parts.sort((a, b) => a.quantity - b.quantity).slice(0, 1);
        console.log('Least Parts:', leastParts);

        // Calculate how many more drones can be assembled
        const assemblies = await Assembly.find();
        console.log('Assemblies:', assemblies);
        const droneCount = assemblies.length;

        // Fetch the 3 most recent assemblies
        const recentAssemblies = await Assembly.find().sort({ assemblyDate: -1 }).limit(3).populate('droneId').populate('parts');
        console.log('Recent Assemblies:', recentAssemblies);

        // Calculate how many more drones can be assembled
        const droneModel = await Drone.findOne(); // Assuming a single drone model
        console.log('Drone Model:', droneModel);

        let minParts = Number.MAX_SAFE_INTEGER;
        if (droneModel && droneModel.partsRequired) {
            parts.forEach(part => {
                const requiredQuantity = droneModel.partsRequired[part.name] || 1; // Default to 1 if not defined
                const availableDrones = Math.floor(part.quantity / requiredQuantity);
                if (availableDrones < minParts) {
                    minParts = availableDrones;
                }
            });
        } else {
            console.error('Error: partsRequired is not defined in droneModel');
            minParts = 0;
        }

        console.log('Minimum Parts for Drones:', minParts);

        res.render('statistics', {
            parts,
            leastParts,
            droneCount,
            recentAssemblies,
            minParts
        });
    } catch (err) {
        console.error('Error in statistics route:', err);
        res.status(500).send(err);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Part = require('../Models/part');

/**
 * GET /
 * 
 * Fetches relevant parts for drone building and the least available parts.
 * 
 * Input: None
 * Output: Renders 'statistics' view with parts and least available parts
 */

router.get('/', async (req, res) => {
    try {
        // Fetch relevant parts (assuming parts with specific names are relevant for drone building)
        const relevantPartsNames = ["Motor", "Helice", "Bateria"];
        const parts = await Part.find({ name: { $in: relevantPartsNames } });

        // Least available parts
        const leastAvailableParts = await Part.find().sort({ quantity: 1 }).limit(5);

        // Render 'statistics' view with parts and least available parts data
        res.render('statistics', {
            parts,
            leastAvailableParts
        });
    } catch (err) {
        console.error('Error in statistics route:', err);
        res.status(500).send(err);
    }
});

module.exports = router;

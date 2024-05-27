const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Define some mock data for testing
    const parts = [
        { name: 'Motor', quantity: 10 },
        { name: 'Helice', quantity: 20 },
        { name: 'Bateria', quantity: 5 }
    ];
    const leastParts = [{ name: 'Bateria', quantity: 5 }];
    const droneCount = 3;
    const minParts = 2;
    const recentAssemblies = [
        { droneId: 'DRONE-1', assemblyDate: new Date(), parts: [{ name: 'Motor', quantity: 4 }, { name: 'Helice', quantity: 16 }, { name: 'Bateria', quantity: 1 }] },
        { droneId: 'DRONE-2', assemblyDate: new Date(), parts: [{ name: 'Motor', quantity: 4 }, { name: 'Helice', quantity: 16 }, { name: 'Bateria', quantity: 1 }] }
    ];

    res.render('test', {
        parts,
        leastParts,
        droneCount,
        minParts,
        recentAssemblies
    });
});

module.exports = router;

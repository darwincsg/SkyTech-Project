const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    droneId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    partsRequired: { // Add this field if not already present
        Motor: { type: Number, required: true },
        Helice: { type: Number, required: true },
        Bateria: { type: Number, required: true },
        // Add other parts as needed
    }
});

module.exports = mongoose.model('Drone', droneSchema);

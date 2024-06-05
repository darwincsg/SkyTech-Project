const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    droneId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    partsRequired: { 
        Motor: { type: Number, required: true },
        Helice: { type: Number, required: true },
        Bateria: { type: Number, required: true }, //mete aqui
    }
});

module.exports = mongoose.model('Drone', droneSchema);

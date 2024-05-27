const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: String
});

module.exports = mongoose.model("Part", PartSchema);

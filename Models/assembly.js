const mongoose = require('mongoose');

const AssemblySchema = new mongoose.Schema({
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assembly", AssemblySchema);

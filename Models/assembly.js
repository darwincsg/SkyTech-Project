const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssemblySchema = new Schema({
    droneId: { type: Schema.Types.ObjectId, ref: 'Drone' },
    parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
    assemblyDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assembly', AssemblySchema);

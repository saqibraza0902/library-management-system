const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    type: { type: String, required: true },
    yearlevel: { type: String, required: true },
    status: { type: String, required: true }
}, { timestamps: true });
const Members = mongoose.model('members', memberSchema);
module.exports = Members;
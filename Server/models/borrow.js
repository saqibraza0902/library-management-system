const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },
    borrowDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, default:'Pending', },
    returnDate: { type: String, default:'' }
}, { timestamps: true });
const Borrows = mongoose.model('borrows', borrowSchema);
module.exports = Borrows;
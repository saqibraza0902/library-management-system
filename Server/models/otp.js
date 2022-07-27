const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({

    code: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // expireIn: Number,
}, {
    timeStamps: true,
})
const otp = mongoose.model('otp', otpSchema, 'otp');
module.exports = otp;
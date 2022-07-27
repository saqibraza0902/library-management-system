const User = require('../models/user');
const OTP = require('../models/otp')
const Vonage = require("@vonage/server-sdk");
const nodemailer = require('nodemailer');

const loginCtrl = {
    sendOTP: async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.body.email,
                password: req.body.password
            })
            const response = {};
            if (user) {
                const otpCode = Math.floor(Math.random() * 10000 + 1);

                let otpData = new OTP({
                    user: user._id,
                    code: otpCode,
                    // expireIn: new Date().getTime() + 3000 * 1000
                })
                const otp = JSON.stringify(otpCode)
                const email = req.body.email
                mailer(email, otp)
                let otpResponse = await otpData.save();

                const phone = JSON.stringify(req.body.phone)

                // number(phone, otp)

                return res.json({ status: 'Ok', user_id: user._id })
            } else {
                return res.json({ status: 'error', user: false })
            }

        } catch (err) {
            console.log(err)
        }
    }
}
// const number = (phone, otp) => {
//     try {
//         const OTP = otp
//         const vonage = new Vonage({
//             apiKey: "461dba7a",
//             apiSecret: "1FzTYpjfzMBKlwzk"
//         })
//         const from = "Vonage APIs"
//         const to = "923116931514"
//         const text = `Your OTP for login is ${OTP}`

//         vonage.message.sendSms(from, to, text, (err, responseData) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (responseData.messages[0]['status'] === "0") {
//                     console.log("Message sent successfully.");
//                 } else {
//                     console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//                 }
//             }
//         })
//     } catch (error) {
//         return res.status(500).json({ msg: error.message });
//     }
// }
const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secureConnection: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Your OTP for SignIN',
        text: otp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
        }
        console.log('Email Sent at ' + email);
    });
}
module.exports = loginCtrl
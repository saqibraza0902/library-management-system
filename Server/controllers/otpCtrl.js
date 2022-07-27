const OTP = require('../models/otp')
const jwt = require('jsonwebtoken')


const otpCtrl = {
    verifyOtp: async (req, res) => {
        try {
            const { code, user } = req.body
            const check = await OTP.findOne({ code: code })

            // console.log(check)

            if (!check) {
                return res.status(400).json({ msg: 'Invalid Otp' })
            } else {
                const token = jwt.sign({ user }, process.env.SECRET)
                const userDetail = await OTP.findOne({ code: code, user: user }).populate('user')
                // console.log(userDetail)
                await OTP.findOneAndDelete({ code: code })
                return res.json({ token: token, detail: userDetail })

            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = otpCtrl
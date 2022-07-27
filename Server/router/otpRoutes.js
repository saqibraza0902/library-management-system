const otpCtrl = require('../controllers/otpCtrl')
const router = require('express').Router()

router.post('/verify-otp', otpCtrl.verifyOtp)

module.exports = router
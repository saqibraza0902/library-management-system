const loginCtrl = require('../controllers/loginCtrl')
const router = require('express').Router()


router.post('/login', loginCtrl.sendOTP)

module.exports = router
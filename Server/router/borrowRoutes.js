const express = require('express');
const router = express.Router();
const borrowCtrl = require('../controllers/borrowCtrl')

router.get('/all-borrow', borrowCtrl.getBorrow)
router.post('/register', borrowCtrl.postBorrow)
router.post('/update/:id', borrowCtrl.updateBorrow)
// router.post('/updateCopy/:id', borrowCtrl.updateCopies)

module.exports = router
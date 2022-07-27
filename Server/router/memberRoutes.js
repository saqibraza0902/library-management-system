const express = require('express');
const router = express.Router();
const memberCtrl = require('../controllers/memberCtrl')

router.get('/all-members', memberCtrl.getMember)
router.post('/register', memberCtrl.postMember)
router.patch('/update/:id', memberCtrl.updateMember)
router.delete('/delete/:id', memberCtrl.deleteMember)

module.exports = router
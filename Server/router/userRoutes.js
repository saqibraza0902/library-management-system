const express = require('express');
const userCtrl = require('../controllers/userCtrl')
const router = require('express').Router()

router.get('/all-users', userCtrl.getUser)
router.post('/register', userCtrl.postUser)
router.patch('/update/:id', userCtrl.updateUser)
router.delete('/delete/:id', userCtrl.deleteUser)
module.exports = router
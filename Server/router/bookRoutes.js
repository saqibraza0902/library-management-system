const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/bookCtrl')

router.get('/all-books', bookCtrl.getBooks)
router.post('/register', bookCtrl.postBook)
router.put('/update/:id', bookCtrl.updateBook)
router.delete('/delete/:id', bookCtrl.deleteBook)

module.exports = router
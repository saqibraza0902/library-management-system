require('dotenv').config()
const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const app = express();

app.use(cors())
require('./db/connection');
app.use(express.json())

app.use('/user', require('./router/userRoutes'))
app.use('/member', require('./router/memberRoutes'))
app.use('/book', require('./router/bookRoutes'))
app.use('/borrow', require('./router/borrowRoutes'))
app.use('/user', require('./router/otpRoutes'))
app.use('/user', require('./router/loginRoute'))

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

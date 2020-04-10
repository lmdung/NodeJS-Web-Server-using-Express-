const express = require('express');
const pug = require('pug');
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
var cookieParser = require('cookie-parser')
const authMiddelware = require('./middleware/auth.middleware')

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser('sfw3wfw323r2'))

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Dung'
    })
})
//router
app.use('/users',authMiddelware.reuiredAuth, userRoute)
app.use('/login', authRoute)

app.listen(port, () => {
    console.log('Listen on port:', port)
})
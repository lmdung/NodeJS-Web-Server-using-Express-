const express = require('express');
const pug = require('pug');
const userRoute = require('./routes/user.route')

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Dung'
    })
})
app.use('/users', userRoute)
app.listen(port, () => {
    console.log('Listen on port:', port)
})
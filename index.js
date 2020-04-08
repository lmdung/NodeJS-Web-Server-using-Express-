const express = require('express');
const pug = require('pug');

const app = express();
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Dung'
    })
})
app.get('/users', (req, res) => {
    res.render('./users/index', {
        users: [
            { id: 1, name: 'Chiu' },
            { id: 2, name: 'Dung' }
        ]
    })
});

app.listen(port, () => {
    console.log('Listen on port:', port)
})
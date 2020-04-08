const express = require('express');
const pug = require('pug');
const low = require('lowdb')
const shortid = require('shortid');

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const app = express();
const port = 3000;

// Set some defaults
db.defaults({ users: [] })
  .write()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Dung'
    })
})
app.get('/users', (req, res) => {
    res.render('./users/index', {
        users: db.get('users').value()
    })
});
app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let users = db.get('users').value();
    var matchedUsers = users.filter((user) => {
        return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
    })
    res.render('./users/index', {
        users: matchedUsers,
        value: q,
    })
})
app.get('/users/create', (req, res) => {
    res.render('./users/create')
})
app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({id: id}).value()
    res.render('./users/view', {
        user: user
    })
})
app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})
app.listen(port, () => {
    console.log('Listen on port:', port)
})
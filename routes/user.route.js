var express = require('express')
const db = require('../db')
const shortid = require('shortid');
var router = express.Router()

router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
});
router.get('/search', (req, res) => {
    let q = req.query.q;
    let users = db.get('users').value();
    var matchedUsers = users.filter((user) => {
        return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers,
        value: q,
    })
})
router.get('/create', (req, res) => {
    res.render('users/create')
})
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({id: id}).value()
    res.render('users/view', {
        user: user
    })
})
router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('users')
})

module.exports = router;
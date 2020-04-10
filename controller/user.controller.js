const db = require('../db')
const shortid = require('shortid');

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
};
module.exports.search = (req, res) => {
    let q = req.query.q;
    let users = db.get('users').value();
    var matchedUsers = users.filter((user) => {
        return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers,
        value: q,
    })
}
module.exports.create = (req, res) => {
    res.render('users/create')
};
module.exports.detail = (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({id: id}).value()
    res.render('users/view', {
        user: user
    })
};
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    let errors = [];
    if (!req.body.name || req.body.name.trim() == '') {
        errors.push('Name is required')
    }
    if (!req.body.phone || req.body.phone.trim() == '') {
        errors.push('Phone is required')
    }
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return
    }
    db.get('users').push(req.body).write();
    res.redirect('/users')
};
const db = require('../db')
module.exports.reuiredAuth = (req, res, next) => {
    if (!req.cookies.userID) {
        res.redirect('/login');
        return;
    }
    var user = db.get('users').find({id: req.cookies.userID}).value();
    if (!user) {
        res.redirect('/login');
        return;
    }
    next()
}
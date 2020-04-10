const db = require('../db')
module.exports.reuiredAuth = (req, res, next) => {
    if (!req.signedCookies.userID) {
        res.redirect('/login');
        return;
    }
    var user = db.get('users').find({id: req.signedCookies.userID}).value();
    if (!user) {
        res.redirect('/login');
        return;
    }
    next()
}
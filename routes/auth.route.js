var express = require('express')
const authController = require('../controller/auth.controller')
const authValidate = require('../validate/auth.validate')
var router = express.Router()

router.get('/', authController.login)
router.post('/',authValidate.postLogin, authController.postLogin)
module.exports = router;
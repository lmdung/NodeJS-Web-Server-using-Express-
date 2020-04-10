var express = require('express')
const userController = require('../controller/user.controller')
const userValidate = require('../validate/user.validate')
var router = express.Router()

router.get('/', userController.index);
router.get('/search', userController.search)
router.get('/create', userController.create)
router.get('/:id', userController.detail)
router.post('/create', userValidate.postCreate, userController.postCreate)

module.exports = router;
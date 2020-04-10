var express = require('express')
const userController = require('../controller/user.controller')

var router = express.Router()

router.get('/', userController.index);
router.get('/search', userController.search)
router.get('/create', userController.create)
router.get('/:id', userController.detail)
router.post('/create', userController.postCreate)

module.exports = router;
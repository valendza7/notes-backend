"use strict"
const express = require('express');
const router = express.Router()
const controllers = require("../controllers/notes.controller")
const { require_auth_encrypted } = require('../helpers/jwt.js');

router.get('/getall', require_auth_encrypted, controllers.getall)
router.get('/:id', require_auth_encrypted, controllers.get)
router.post('/', require_auth_encrypted, controllers.create)
router.patch('/:noteid', require_auth_encrypted, controllers.edit)
router.delete('/:noteid', require_auth_encrypted, controllers.delete)

module.exports = router;
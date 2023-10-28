"use strict"
const express = require('express');
const router = express.Router()

// Router Paths
const auth_routes = require('./auth.route');
const notes_routes = require('./notes.route')

router.use('/auth', auth_routes);
router.use('/notes', notes_routes);

module.exports = router
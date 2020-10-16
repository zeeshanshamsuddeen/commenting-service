const express = require('express');

const middlewares = require('../middlewares');
const accounts = require('./accounts');
const comments = require('./comments');

const router = express.Router();

router.use('/accounts', accounts);
router.use('/comments', middlewares.authenticateApi, comments);

module.exports = router;

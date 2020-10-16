const express = require('express');

const router = express.Router();

const { asyncRoute } = require('../middlewares');
const { accounts } = require('../controllers');

router.post('/login', asyncRoute(accounts.login));

module.exports = router;

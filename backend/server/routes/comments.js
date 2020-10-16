const express = require('express');

const router = express.Router();

const { asyncRoute } = require('../middlewares');
const { comments } = require('../controllers');

router.get('/', asyncRoute(comments.getComments));

router.post('/', asyncRoute(comments.addComment));

router.put('/:id', asyncRoute(comments.editComment));

module.exports = router;

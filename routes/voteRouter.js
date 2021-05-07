const express = require('express');
const voteController = require('../controllers/voteController');

exports.router = (() => {
    const router = express.Router();

    router.route('/').get(voteController.getVotes);

    return router;
})()
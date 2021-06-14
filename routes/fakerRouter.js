const express = require('express');
const voteController = require('../controllers/voteController');
const Helper = require('../helpers');
const jwt = require('jsonwebtoken');  

exports.router = (() => {
    const router = express.Router();

    router.all('*', function (req, res, next) {
        if (!req.header('Authorization')) {
            Helper.buildError(res, "Missing 'Authorization Bearer'.");
            return;
        }

        const authorizationParts = req.header('Authorization').split(' ');
        const token = authorizationParts[1];
        
        const partial = jwt.verify(token, global.JWT_SECRET);

        if (partial._id) {
            req.partial = partial;
        } else {
            Helper.buildError(res, "Bad credentials.");
            return;
        }

        next();
    });

    router.route('/vote').post(voteController.generateVote);

    return router;
})();
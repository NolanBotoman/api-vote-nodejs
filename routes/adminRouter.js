const express = require('express');
const adminController = require('../controllers/adminController');
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

        if (partial._id && partial.is_admin) {
            req.partial = partial;
        } else {
            Helper.buildError(res, "Bad credentials.");
            return;
        }

        next();
    });

    router.route('/users').get(adminController.getUsers);
    router.route('/users/:id').get(adminController.getUser);
   
    return router;
})();
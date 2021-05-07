const express = require('express');
const adminController = require('../controllers/adminController');

exports.router = (() => {
    const router = express.Router();

    router.route('/users').get(adminController.getUsers);
    router.route('/users/:id').get(adminController.getUser);
    
    return router;
})();
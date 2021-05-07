const express = require('express');
const authController = require('../controllers/authController');

exports.router = (() => {
    const router = express.Router();

    router.route('/signup/').post(authController.signUp);
    router.route('/signin/').post(authController.signIn);

    return router;
})();
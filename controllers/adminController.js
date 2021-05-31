const User = require('../models/user');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select('username');

            return res.status(200).json({
                success: true,
                users: [users]
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    },
    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id).select('name');

            return res.status(200).json({
                success: true,
                user: user
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    }
}
const User = require('../models/user')
const Helper = require('../helpers');

module.exports = {
    async signUp(req, res) {
        console.log(req.body)
        if (!req.body.name || !req.body.email || !req.body.password) {
            Helper.buildError(res, "Empty fields aren't allowed.");
            return;
        } else if (!Helper.checkMail(req.body.email)) {
            Helper.buildError(res, "Email address isn't valid.");
            return;
        }

        try {
            const name = req.body.name; const email = req.body.email; const password = req.body.password;
            
            const user = new User({ name, email, password });
            const newUser = await user.save();

            return res.status(200).send({
                success: true,
                name: name,
                _id: newUser._id
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Erreur');
        }
    },
    async signIn(req, res) {
        if (!req.body.name || !req.body.password) {
            Helper.buildError(res, "Empty fields aren't allowed.");
            return;
        } else if (!Helper.checkMail(req.body.email)) {
            Helper.buildError(res, "Email address isn't valid.");
            return;
        }

        try {
            const referencedUser = await User.findOne({ "name": req.body.name, "password": req.body.password });

            if (referencedUser == null) {
                Helper.buildError(res, "User not found.");
                return;
            }

            return res.status(200).json({
                success: true,
                user: {
                    name: referencedUser.name,
                    _id: referencedUser._id
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Erreur');
        }
    },
}
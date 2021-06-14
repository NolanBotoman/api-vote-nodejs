const User = require('../models/user');
const Mail = require('../models/Mail');
const Helper = require('../helpers');

module.exports = {
    async signUp(req, res) {
        if (!req.body.name || !req.body.email || !req.body.password) {
            Helper.buildError(res, "Empty fields aren't allowed. Require 'name', 'email', 'password");
            return;
        } else if (!Helper.checkMail(req.body.email)) {
            Helper.buildError(res, "Email address isn't valid.");
            return;
        }

        const alreadyExists = await User.findOne({ "email": req.body.email });

        if (alreadyExists) {
            Helper.buildError(res, "Email address is alreayd registered.");
            return;
        }

        try {
            const name = req.body.name; const email = req.body.email; const password = req.body.password;
            
            const user = new User({ name, email });
            user.storePassword(password);
            const newUser = await user.save();

            Mail.makeMail("FRESH_CREATED", email);

            return res.status(200).send({
                success: true,
                name: name,
                _id: newUser._id
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    },
    async signIn(req, res) {
        if (!req.body.name || !req.body.password) {
            Helper.buildError(res, "Empty fields aren't allowed. Require 'name', 'password'");
            return;
        } else if (!Helper.checkMail(req.body.email)) {
            Helper.buildError(res, "Email address isn't valid.");
            return;
        }

        try {
            const referencedUser = await User.findOne({ "email": req.body.email });

            if (referencedUser == null) {
                Helper.buildError(res, "Unknown user.");
                return;
            } else if (referencedUser.verifyHash(req.body.password)) {
                Helper.buildError(res, "Bad credentials.");
                return;
            }

            return res.status(200).json({
                success: true,
                user: {
                    token: referencedUser.generateNewJWT()
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    },
}
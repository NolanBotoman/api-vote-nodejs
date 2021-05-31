const User = require('./models/user');

module.exports = {
	buildError(res, message) {
		return res.status(401).json({
            success: false,
            error: message
        });
	},
	checkMail(mail) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(mail).toLowerCase());
	},
	async checkExistantMail(mail) {
		User.exists({ email: mail });
	}
}
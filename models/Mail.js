const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

class Mail {
    static FRESH_CREATED = {
        from : '',
        to : '',
        subject : 'Your new account on API-Sondage',
        text : `
          Hello Dear Customer !
          You've successfully created a new account on our platform !
        `
    };

    static getTemplateById(id) {
        return this[id];
    }

    static makeMail(id, to) {
        const template = this.getTemplateById(id);
        
        template.to = to;
        template.from = process.env.MAIL_USER;

        let transporter = nodemailer.createTransport({
            service : 'Gmail',
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASSWORD
            }
        });

        transporter.sendMail(template, function(err, data){
            const output = (err) ? "An error occured while sending mail : " + err : "Mail sent to : " + to;
            console.log(output);
        });
    }
}

module.exports = Mail;
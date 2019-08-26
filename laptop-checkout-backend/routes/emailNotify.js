var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer');

//======================================================//
//                EMAIL NOTIFICATION ROUTES             //
//                        /notify                       //
//======================================================//

var serverEmail = '';
var serverEmailPassword = '';
var serverEmailProvider = 'gmail';

var transporter = nodemailer.createTransport({
    service: serverEmailProvider,
    auth: {
        user: serverEmail,
        pass: serverEmailPassword
    }
});

// NOTIFY CREATE - Create and send email notification
router.post("/", function(req, res){

    var mailOptions = {
        from: {
            name: 'MAI IT Department', 
            address: serverEmail
        },
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send({message: 'Email Sent'});
});

module.exports = router;
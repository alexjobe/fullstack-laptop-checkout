var express = require('express'),
    router = express.Router(),
    emailScheduler = require('../utils/emailScheduler');

//======================================================//
//                EMAIL NOTIFICATION ROUTES             //
//                        /notify                       //
//======================================================//

// NOTIFY CREATE - Create and send email notification
router.post("/", function(req, res){
    emailScheduler.sendReminderEmail(req.body);
    res.send({message: 'Email Sent'});
});

// OVERDUE CREATE - Create and send email notification
router.post("/overdue", function(req, res){
    emailScheduler.sendOverdueEmail(req.body);
    res.send({message: 'Email Sent'});
});

module.exports = router;
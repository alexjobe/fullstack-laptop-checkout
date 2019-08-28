var cron = require('node-cron'),
    db = require('../models'),
    nodemailer = require('nodemailer');

// Credentials for Nodemailer
const serverEmail = process.env.EMAIL || '';
const serverEmailPassword = process.env.EMAIL_PASSWORD || '';
const serverEmailProvider = process.env.EMAIL_PROVIDER || '';

// emailSchedule defines when the server should send automated emails. Uses node-cron syntax, and
// defaults to every Monday.
const emailSchedule = process.env.EMAIL_SCHEDULE || '* * * * Monday';
// emailNumWeeksAhead defines how many weeks ahead the server should send reminder emails. For example, 
// a value of 2 means reminder emails will only be sent for laptops that are due in less than 2 weeks
const emailNumWeeksAhead = process.env.EMAIL_NUM_WEEKS_AHEAD || 2;

// Create Nodemailer transporter
var transporter = nodemailer.createTransport({
    service: serverEmailProvider,
    auth: {
        user: serverEmail,
        pass: serverEmailPassword
    }
});

// Sets up scheduled task to call sendEmails (according to emailSchedule)
exports.schedule = cron.schedule(emailSchedule, () => {
    sendEmails();
});

// Searches all laptops in database and sends an email if they have a currentCheckout
function sendEmails() {
    db.Laptop.find({currentCheckout: {$ne:null}}).populate('currentCheckout')
    .then(function(laptops){
        laptops.forEach(laptop => {
            sendEmail(laptop);
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

// If laptop is overdue, sends an overdue email. Otherwise, if the dueDate is less than
// emailNumWeeksAhead, sends a reminder email
function sendEmail(laptop) {
    var dueDate = new Date(laptop.currentCheckout.dueDate);
    var numWeeksUntilDue = Math.abs(dueDate - Date.now()) / (1000 * 60 * 60 * 24 * 7);
    if(dueDate < Date.now()) {
        exports.sendOverdueEmail(laptop)
    } 
    else if(numWeeksUntilDue < emailNumWeeksAhead) {
        exports.sendReminderEmail(laptop);
    }
}

exports.sendReminderEmail = function(laptop) {
    var dueDate = new Date(laptop.currentCheckout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var checkoutDate = new Date(laptop.currentCheckout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var message = 'Hello ' + laptop.currentCheckout.userName + ',\n\n' +
    'The laptop you checked out will be due ' +  dueDate + 
    '. Please return it to the MAI Animal Health IT department before then.\n\n' +
    '***Checkout Summary***\n\n' +
    'Laptop: ' + laptop.name + '\n' + 
    'Checked Out: ' + checkoutDate + '\n' +
    'Due Date: ' + dueDate;

    var mailOptions = {
        from: {
            name: 'MAI IT Department', 
            address: serverEmail
        },
        to: laptop.currentCheckout.userEmail,
        subject: 'Laptop Due Date Reminder',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.sendOverdueEmail = function(laptop) {
    var dueDate = new Date(laptop.currentCheckout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var checkoutDate = new Date(laptop.currentCheckout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var message = 'Hello ' + laptop.currentCheckout.userName + ',\n\n' +
    'The laptop you checked out was due ' +  dueDate + 
    '. Please return it to the MAI Animal Health IT department.\n\n' +
    '***Checkout Summary***\n\n' +
    'Laptop: ' + laptop.name + '\n' + 
    'Checked Out: ' + checkoutDate + '\n' +
    'Due Date: ' + dueDate;

    var mailOptions = {
        from: {
            name: 'MAI IT Department', 
            address: serverEmail
        },
        to: laptop.currentCheckout.userEmail,
        subject: 'Laptop Overdue Notice',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = exports;
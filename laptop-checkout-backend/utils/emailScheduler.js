var cron = require('node-cron'),
    db = require('../models'),
    nodemailer = require('nodemailer');

// Credentials for Nodemailer
const email = process.env.EMAIL || '';
const emailUser = process.env.EMAIL_ACCOUNT || '';
const emailPassword = process.env.EMAIL_PASSWORD || '';
const emailProvider = process.env.EMAIL_PROVIDER || '';
const emailFrom = process.env.EMAIL_FROM || '';

// emailSchedule defines when the server should send automated emails. Uses node-cron syntax, and
// defaults to every Monday.
const emailSchedule = process.env.EMAIL_SCHEDULE || '* * * * Monday';

// emailNumWeeksAhead defines how many weeks ahead the server should send reminder emails. For example, 
// a value of 2 means reminder emails will only be sent for laptops that are due in less than 2 weeks
const emailNumWeeksAhead = process.env.EMAIL_NUM_WEEKS_AHEAD || 2;

// Create Nodemailer transporter
var transporter = nodemailer.createTransport({
    service: emailProvider,
    auth: {
        user: emailUser,
        pass: emailPassword
    }
});

// Sets up scheduled task to call sendEmails (according to emailSchedule)
exports.schedule = cron.schedule(emailSchedule, () => {
    console.log("Sending scheduled emails...")
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
    'Laptop: ' + laptop.name + '\n\n' + 
    'Checked Out: ' + checkoutDate + '\n\n' +
    'Due Date: ' + dueDate + '\n\n' +
    '[THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY]';

    var mailOptions = {
        from: {
            name: emailFrom, 
            address: email
        },
        to: laptop.currentCheckout.userEmail,
        cc: email,
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

    updateLastEmailDate(laptop);
}

exports.sendOverdueEmail = function(laptop) {
    var dueDate = new Date(laptop.currentCheckout.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var checkoutDate = new Date(laptop.currentCheckout.checkoutDate).toLocaleDateString('en-US', { timeZone: 'UTC' });
    var message = 'Hello ' + laptop.currentCheckout.userName + ',\n\n' +
    'The laptop you checked out was due ' +  dueDate + 
    '. Please return it to the MAI Animal Health IT department.\n\n' +
    '***Checkout Summary***\n\n' +
    'Laptop: ' + laptop.name + '\n\n' + 
    'Checked Out: ' + checkoutDate + '\n\n' +
    'Due Date: ' + dueDate + '\n\n' +
    '[THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY]';

    var mailOptions = {
        from: {
            name: emailFrom, 
            address: email
        },
        to: laptop.currentCheckout.userEmail,
        cc: email,
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

    updateLastEmailDate(laptop);
}

// Update lastEmailDate, to track the last time an email was sent for this checkout
function updateLastEmailDate(laptop) {
    db.Checkout.findById(laptop.currentCheckout._id)
    .then(function(checkout) {
        checkout.lastEmailDate = Date.now();
        checkout.save();
    })
    .catch(function(err){
        console.log(err);
    });
}

module.exports = exports;
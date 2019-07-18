var mongoose = require("mongoose");

// SCHEMA SETUP
var laptopSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: 'Name cannot be blank'
    },
    serialCode: {
        type: String,
        required: 'Serial code cannot be blank'
    },
    isCheckedOut: {type: Boolean, default: false},
    currentCheckout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Checkout"
    },
    checkoutHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Checkout"
        }
    ]
});

var Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
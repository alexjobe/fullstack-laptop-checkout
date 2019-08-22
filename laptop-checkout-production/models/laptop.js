var mongoose = require("mongoose");

// SCHEMA SETUP
var laptopSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: 'Name cannot be blank'
    },
    leaseDate: {
        type: Date,
        default: Date.now
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
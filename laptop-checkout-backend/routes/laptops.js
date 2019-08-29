var express = require('express'),
    router = express.Router();
    var db = require('../models');

//======================================================//
//                    LAPTOP ROUTES                     //
//                     /api/laptops                     //
//======================================================//

// LAPTOP INDEX - Get all laptops
router.get("/", function(req, res){
    db.Laptop.find().populate('currentCheckout')
    .then(function(laptops){ // Promise instead of typical callback
        res.json(laptops);
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP CREATE - Add new laptop to database
router.post("/", function(req, res){
    db.Laptop.create(req.body)
    .then(function(newLaptop) {
        res.status(201).json(newLaptop); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP GET - Get a single laptop
router.get("/:laptopId", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findById(req.params.laptopId).populate('currentCheckout').populate('checkoutHistory')
    .then(function(foundLaptop){
        res.json(foundLaptop);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// LAPTOP GET HISTORY - Get a laptop's history
router.get("/:laptopId/history", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findById(req.params.laptopId).populate('checkoutHistory')
    .then(function(laptop){
        res.send(laptop.checkoutHistory);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// LAPTOP HISTORY DELETE - Delete a checkout from laptop's history
router.delete("/:laptopId/history/:checkoutId", function(req, res){
    db.Laptop.findOne({_id: req.params.laptopId}).populate('checkoutHistory')
    .then(function(laptop){
        var updatedHistory = laptop.checkoutHistory.filter(function(checkout) {
            if(checkout._id == req.params.checkoutId) {
                return false;
            }
            else { return true; }
        });
        laptop.checkoutHistory = updatedHistory;
        laptop.save();
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP UPDATE - Update a laptop
router.put("/:laptopId", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findOneAndUpdate({_id: req.params.laptopId}, req.body, {new: true}).populate('currentCheckout').populate('checkoutHistory') // {new: true} respond with updated data
    .then(function(laptop){
        if(laptop.currentCheckout) { // If there is a currentCheckout, set isCheckedOut to true
            laptop.isCheckedOut = true;
            if(!laptop.checkoutHistory.includes(laptop.currentCheckout)) {
                laptop.checkoutHistory.push(laptop.currentCheckout) // Add checkout to checkoutHistory array
                const historySet = new Set(laptop.checkoutHistory); // Convert to set to make sure there are no duplicates
                laptop.checkoutHistory = [...historySet];
            }
            laptop.save(); // Save the laptop because we updated checkoutHistory
        }
        else if(laptop.currentCheckout == null) { // If currentCheckout is null, set isCheckedOut to false
            laptop.isCheckedOut = false;
            laptop.save();
        }
        res.json(laptop);
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP DELETE - Delete a laptop
router.delete("/:laptopId", function(req, res){

    db.Laptop.findById(req.params.laptopId)
    .then(function(foundLaptop){
        return db.Checkout.deleteMany({'_id':{'$in':foundLaptop.checkoutHistory}}); // Delete all checkouts associated with this laptop
    })
    .then(function(){
        return db.Laptop.deleteOne({_id: req.params.laptopId});
    })
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;
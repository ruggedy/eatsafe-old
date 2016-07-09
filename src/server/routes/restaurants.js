var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var Restaurant = require('../models/restaurant');
var User = require('../models/user');


router.use('/', function (req, res, next) {
    var cert = fs.readFileSync(path.join(__dirname, 'public.pem'));
    jwt.verify(req.query.token, cert, {algorithms: ['RS256']}, function(err, payload) {
      
        if (err) {
            return res.status(401).json({
                title:'Invalid User',
                error: err
            });
        }
        next();
    });
});

router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Restaurant.findOne({user: decoded.user._id}, function (err, result) {
        if (err) {
            return res.status(404).json({
                title: 'An error occured',
                error: err
            });
        }
        return res.status(200).json({
            message: 'Succesful',
            obj: result
        });    
    })
                
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, doc) {
        var restaurant = new Restaurant();
        var value = req.body.restaurant;
        for (var i=0; i<value.start.length; i++){
            var data = {}

            data['day'] = value.day[i];
            data['starttime'] = value.start[i];
            data['endtime'] = value.end[i];

            var closed = Math.abs(value.end[i] - value.start[i]);

            if (closed) {
                data['closed'] = false;
            } else {
                data['closed'] = true;
            }

            restaurant.opening.push(data);
            
        }

        restaurant.name = value.name;
        restaurant.location.address = value.address1+', '+value.address2;
        restaurant.location.postcode = value.postcode;
        restaurant.location.city = value.city;
        restaurant.contact.email = value.email;
        restaurant.contact.phone = value.phone;
        restaurant.user = doc;

        restaurant.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            doc.restaurant = result._id;
            doc.save();
            return res.status(200).json({
                message: 'Saved succesfully',
                obj: result
            });
        }); 
    });
    
});


module.exports = router;
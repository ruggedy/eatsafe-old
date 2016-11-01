var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var User = require('../models/user');
var mongoose = require('mongoose');
var async = require('async');

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
    Restaurant.findOne({user: decoded.user._id})
        .populate('menu')
        .exec(function (err, result) {
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
        });
                
});

router.post('/menu', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Restaurant.findById(decoded.user.restaurant, function (err, doc) {
        var value = req.body.value.value;
        var checked = req.body.value.checked;
        if (err) {
            return res.status(404).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                message: 'This Profile does not exist',
                error: 'Invalid Profile'
            });
        }
        var menu = new Menu({
            name: value.name,
            description: value.description,
            menu: value.menu,
            restaurant: doc._id 
        });
        if(checked) {
            for(var i = 0; i< checked.length; i++){
                menu.allergens.push(checked[i]);
            }
        } else {
            menu.allergens = [];
        }

        menu.save(function(err, result){
            doc.menu.push(result);
            doc.save();
            return res.status(200).json({
                message: 'all good',
                obj: result
            });
        });
    });
});

router.patch('/menu/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Menu.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
              title: 'An error occured',
              error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
              title: 'No Menu found',
              error: {message: "Menu could not be found"}
            });
        }
        if (String(doc.restaurant) !== String(decoded.user.restaurant)) {
            return res.status(401).json({
                title: 'Unauthorized access',
                error: {message: 'You dont have access to this document'}
            })
        }
        var value = req.body.value.value;
        var checked = req.body.value.checked;

        doc.name = value.name;
        doc.description = value.description;
        doc.menu = value.menu;
        doc.allergens = [];

        for(var i = 0; i< checked.length; i++){
            doc.allergens.push(checked[i]);
        }

        doc.save(function(err, result) {
            if(err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Sucess',
                obj: result
            });
        });

    });
    
});

router.delete('/menu/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Menu.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
              title: 'An error occured',
              error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
              title: 'No Menu found',
              error: {message: "Menu could not be found"}
            });
        }
        if (String(doc.restaurant) !== String(decoded.user.restaurant)) {
            return res.status(401).json({
                title: 'Unauthorized access',
                error: {message: 'You dont have access to this document'}
            })
        }

        doc.remove(function(err, result) {
            if(err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Sucess',
                obj: result
            });
        });
    });
    
});

router.delete('/menu/deleteMulti/:ids', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    var value = JSON.parse(req.params.ids);
    var ids = value.data;
    Menu.find({'_id' : {
        $in : ids.map(function(o){return mongoose.Types.ObjectId(o);})
    }}, function (err, docs) {
       if (err) {
            return res.status(404).json({
              title: 'An error occured',
              error: err
            });
        }
        if (!docs) {
            return res.status(404).json({
              title: 'No Menu found',
              error: {message: "Menu could not be found"}
            });
        }
        if (String(docs[0].restaurant) !== String(decoded.user.restaurant)) {
            return res.status(401).json({
                title: 'Unauthorized access',
                error: {message: 'You dont have access to this document'}
            })
        }

        Restaurant.findById(docs[0].restaurant, function(err, doc) {
            async.forEachOfLimit(docs, 5, function (data) {
                doc.menu.pull(data);
            });
            doc.save();
            next();
        });

        async.forEachOfLimit(docs, 5, function(data, callback) {
            data.remove(function(err, result) {
                if(err) {
                    return res.status(404).json({
                        title: 'An error occured',
                        error: err
                    });
                }
            });
        });
        res.status(201).json({
            message: 'Messages succesfully Deleted'
        });
    }); 
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Restaurant.findById(req.params.id)
        .populate('menu')
        .exec(function(err, doc) {
        
        if (err) {
            return res.status(404).json({
              title: 'An error occured',
              error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
              title: 'No Menu found',
              error: {message: "Menu could not be found"}
            });
        }
        
        var value = req.body.restaurant;
        doc.opening = []
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

            doc.opening.push(data);
            
        }

        doc.name = value.name;
        doc.location.address = value.address1+', '+value.address2;
        doc.location.postcode = value.postcode;
        doc.location.city = value.city;
        doc.contact.email = value.email;
        doc.contact.phone = value.phone;

        doc.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            };
            return res.status(200).json({
                message: 'Saved succesfully',
                obj: result
            });
        }); 
    });
    
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
        restaurant.location.address = value.address1? value.address1 +', '+value.address2 : ' ';
        restaurant.location.postcode = value.postcode? value.postcode : ' ';
        restaurant.location.city = value.city? value.city : ' ';
        restaurant.contact.email = value.email? value.email : ' ';
        restaurant.contact.phone = value.phone? value.phone : ' ';
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
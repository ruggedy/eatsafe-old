var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var path = require('path');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var async = require('async');
var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var mongoose = require('mongoose');
const saltRounds = 13;
var secret = process.env.SECRET_KEY || 'secret';

var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User();
    user.username = req.body.username;

    console.log(req.body);

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.matchingPassword.password, salt, function(err, hash) {
            user.password = hash;
            console.log(user);
            user.save(function (err, result) {
                if (err) {
                    return res.status(404).json({
                        title: 'An error has occured',
                        error: err
                    });
                }
                var cert = fs.readFileSync(path.join(__dirname, 'private.pem'));
                var token = jwt.sign({user: result}, cert, {algorithm: 'RS256', expiresIn: 60});
                res.status(200).json({
                    message: 'Succesfully Created Account',
                    obj: token,
                    userId: result._id
                });
            });
        });
    });
});

router.post('/signin', function (req, res, next) {
    console.log('it hits');
    User.findOne({username: req.body.username}, function (err, doc) {
        var compare = doc? bcrypt.compareSync(req.body.matchingPassword.password, doc.password) : null;
       if (err) {
           return res.status(404).json({
               title: 'An error has occured',
               error: err
           });
       } 
       if (!doc) {
           return res.status(404).json({
               title: 'An error has occured',
               error: 'Invalid Username/Password'
           });
       }
       if(!compare) {
           return res.status(404).json({
               title: 'An error has occured',
               error: 'Invalid Username/Password'
           });
       }

       var cert = fs.readFileSync(path.join(__dirname, 'private.pem'));
       var token = jwt.sign({user: doc}, cert, {algorithm: 'RS256', expiresIn: '28d'});
       console.log(doc);
       res.status(200).json({
           message: 'Succesfully signed in',
           obj: token,
           userId: doc._id,
           restaurantId: doc.restaurant? doc.restaurant : null
       });
    });
});

router.post('/compare', function (req, res, next) {
    console.log(req.body);
    User.findOne({username: req.body.username}, function (err, doc) {
        if (doc === null) {
            console.log(err);
            return res.status(200).json({
                message: 'User does not exist',
                state: true
            });
        }
        return res.status(401).json({
            message: 'User exists',
            state: false
        });

    });
        
});

router.use('/admin', function (req, res, next) {
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

router.get('/admin', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    if(!decoded.user.admin) {
        return res.status(404).json({
            message: 'Unauthourized access'
        })
    }
    User.find({validated: false})
        .populate('restaurant', 'name contact menu')
        .exec(function (err, result) {
            if(err) {
                return res.status(404).json({
                    message: 'An error Occured',
                    error: err
                });
            }

            if(!result) {
                return res.status(200).json({
                    message: 'All Users have been validated'
                });
            }

            return res.status(200).json({
                message: 'Succesful',
                obj: result
            });

        });

});
                

router.patch('/admin/:ids', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var value = JSON.parse(req.params.ids);
    var ids = value.data;
    if(!decoded.user.admin) {
        return res.status(404).json({
            message: 'Unauthourized access'
        })
    }

    User.find({ '_id' : {
        $in : ids.map(function(o) {return mongoose.Types.ObjectId(o);})
    }}, function (err, docs) {
       async.forEachOfLimit(docs, 10, function (data, callback) {
           data.validated = true;
           data.save(function (err, result) {
               if(err) {
                   return res.status(404).json({
                       message: 'An error Occured',
                       error: err
                   });
               }
           });
       });

        return res.status(201).json({
            message: 'Accounts Succefully Validated'
        })
    });
               
});

router.delete('/admin/:ids', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var value = JSON.parse(req.params.ids);
    var userIds = value.userData;
    var menuIds = value.menuData;
    if(!decoded.user.admin) {
        return res.status(404).json({
            message: 'Unauthourized access'
        })
    }

    Menu.find({'_id' :{
        $in :menuIds.map(function(o) {return mongoose.Types.ObjectId(o);})
    }}, function (err, docs) {
        if(docs) {
            async.forEachOfLimit(docs, 5, function (data) {
                data.remove()
            });
        }
        next()
    });

    User.find({ '_id' : {
        $in : userIds.map(function(o) {return mongoose.Types.ObjectId(o);})
    }}, function (err, docs) {
       async.forEachOfLimit(docs, 5, function (data) {
           if(data.restaurant) {
               Restaurant.findById(data.restaurant, function (err, restDoc) {
                   if(restDoc) {
                       restDoc.remove()
                   }               
               });
           }
           data.remove()
       });

       console.log(menuIds);
       res.status(201).json({
           message: 'Accounts deleted'
       })
    });
               
});


module.exports = router;
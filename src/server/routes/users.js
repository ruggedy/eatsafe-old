var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var path = require('path');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var mongoose = require('mongoose');
const saltRounds = 13;
var secret = process.env.SECRET_KEY || 'secret';

var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User();
    user.username = req.body.username;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
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
    User.findOne({username: req.body.username}, function (err, doc) {
        var compare = doc? bcrypt.compareSync(req.body.password, doc.password) : null;
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
       var token = jwt.sign({user: doc}, cert, {algorithm: 'RS256', expiresIn: 60});
       res.status(200).json({
           message: 'Succesfully signed in',
           obj: token,
           userId: doc._id
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




module.exports = router;
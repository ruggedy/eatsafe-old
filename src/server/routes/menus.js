var express = require('express');
var router = express.Router();

var Menu = require('../models/menu');

router.get('/', function (req, res, next) {
    Menu.find()
            .exec(function (err, result) {
                if (err) {
                    return res.status(404).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Succesful',
                    obj: result
              });
        });
});

router.post('/', function (req, res, next) {
    var menu = new Menu({
        
    })
})


module.exports = router;
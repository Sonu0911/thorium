const express = require('express');

const router = express.Router();

// router.get('/test-me', function (req, res) {
//     res.send('My first ever api!')
// });

// module.exports = router;
// adding this comment for no reasonlet players = [ 

var play = [];
var nameArray = [];

router.post('/test-me', function(req, res) {
    play.push(req.body) // insert data in play array
    res.send(play) //send response to client side 

});
router.post('/test-me2', function(req, res) {
    if (nameArray.includes(req.body.name)) {
        return res.send('name Already exit')
    }

    nameArray.push(req.body.name);


    play.push(req.body) // insert data in play array

    res.send(play) //send response to client side 

});
// router.get('/test-me2',controller.create()); 

module.exports = router;
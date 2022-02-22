let logger = require('../logger/logger')
let helper = require('../util/helper')
let formatter = require('../validator/formatter')
let lo_dash = require('../lodashFolder/lodashOperations')



const express = require('express');
const router = express.Router();

router.get('/test-me', function(req, res) {
    logger.welcome()
    console.log(logger.url)
    helper.printDates()
    helper.printMonths()
    helper.getBatchInfo()
    formatter.trim()
    formatter.changetoLowerCase()
    formatter.changetoUpperCase()
    res.send('welcome to my applicatin. I am Rushikesh Galchelwar and a part of FunctionUp Thorium cohort !')
});

router.get('/hello', function(req, res) {
    lo_dash.chunkArr()
    lo_dash.tailArr()
    lo_dash.unionArr()
    lo_dash.fromPairArr()
    res.send('This is hello route')
})
module.exports = router;
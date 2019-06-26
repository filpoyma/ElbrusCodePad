const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
console.log('started entries');
const {sessionChecker} = require('../middleware/auth');


// entries
router.route('/')
    .get( async function (req, res, next) {
        res.render('entries/index');
    })
    .post(async function (req, res, next) {

    });

module.exports = router;



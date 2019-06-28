const express = require('express');
const router = express.Router();
const Link = require('../models/links');
const User = require('../models/users');
console.log('started entries');
const {sessionChecker} = require('../middleware/auth');


// entries
router.route('/')
    .get( sessionChecker, async function (req, res, next) {
        console.log('// entries');
        const users = await User.find();
        if(req.session.user.name === 'admin') res.render('entries/index', {admin: true, users});
        else res.render('entries/index', {admin: false, users})
    })
    .post( async function (req, res, next ) {
    });

router.route('/:id')
    .get( async function (req, res, next) {

        let isLinkExist = await Link.findOne({link: req.params.id});
        console.log(req.params.id, isLinkExist);
        if (isLinkExist) res.redirect('/');
        else res.redirect('/');
    })
    .post(async  function ( req, res, next) {
        const { link } = req.body;
        try {
            const links = new Link({ link });
            // const newUser = await User.findOne({ name: req.body.name});
            // if(newUser) return res.render('auth/signup', {regerror: `nick name ${req.body.name} is exist. type another name. `});
            await links.save();
            //res.end();
        }
        catch (error) {
            console.log('<<<<error>>>');
        }
        //res.end();
    });

module.exports = router;





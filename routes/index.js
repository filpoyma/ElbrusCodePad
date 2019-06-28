'use strict'

const express = require('express');
const {sessionChecker} = require('../middleware/auth');
const User = require('../models/users');
const router = express.Router();


router.get('/', sessionChecker, (req, res) => {
    res.redirect('/interview');
});


// route for user signup
router.route('/signup')
    .get((req, res) => {
        if (req.session.user)
            res.redirect('/entries');
        else
            res.render('auth/login.hbs');
    })
    .post(async (req, res) => {
        let currentUser =  await User.findOne({name: 'admin'});
        if(currentUser === null) currentUser = false;
        const {name} = req.body;
        // console.log('currentUser', currentUser);
        // console.log('session', req.session);
        try {
            const user = new User({
                name: name,
            });
            if (await currentUser.name !== name) {
                await user.save();
            }
                req.session.user = user;
            res.redirect('/interview');
        }
        catch (error) {
            console.log('<<<<error>>>> index.js 39');
            res.redirect('/signup');
        }
    });


// route for user Login
router.route('/login/:id')
    .get(sessionChecker, (req, res) => {

        res.redirect('/interview');
    })
    .post(async (req, res) => {
        const {name, password} = req.body;
        const user = await User.findOne({name});
        if (!user) {
            res.redirect('/login');
            console.log('**********wrong user')
        } else if (user.password !== password) {
            console.log('***********wrong password');
            console.log(user.password, password);
            res.redirect('/login');
        } else {
            req.session.user = user;
            res.redirect('/entries');
        }
    });

// route for user logout
router.get('/logout', async (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        try {
            await req.session.destroy();
            await User.find({name: {$ne: "admin"}}).deleteMany().exec();
            //await User.drop();
            //console.log(delUser);
            res.redirect('/');
        }
        catch (error) {
            next(error);
        }
    } else {
        res.redirect('/login');
    }
});


module.exports = router;

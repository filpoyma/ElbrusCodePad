'use strict'

const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');
const router = express.Router();


// router.get('/', sessionChecker, (req, res) => {
//     res.redirect('/entries');
// });

router.get('/', (req, res) => {
    res.redirect('/entries');
});

// route for user signup
router.route('/signup')
    .get( (req, res) => {
        if (req.session.user)
            res.redirect('/entries');
        else
            res.render('auth/signup.hbs');
    })
    .post(async (req, res) => {
        const {name, email, password} = req.body;
        try {
            const user = new User({
                username: name,
                email: email,
                password: password
            });
            const newUser = await User.findOne({ name: req.body.name});
            if(newUser) return res.render('auth/signup', {regerror: `nick name ${req.body.name} is exist. type another name. `});
            if(email === '') return res.render('auth/signup', {regerror: 'email cant be blanc. '});
            if(password.length < 4) return res.render('auth/signup', {regerror: 'password too short. minimum - 4 '});
            await user.save();
            req.session.user = user;
            res.redirect('/entries');
        }
        catch (error) {
            res.redirect('/signup');
        };
    });


// route for user Login
router.route('/login')
    .get(sessionChecker, (req, res) => {
        res.redirect('/entries');
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
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
            // res.clearCookie('user_sid');
            await req.session.destroy();
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

const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
console.log('started entries');
const {sessionChecker} = require('../middleware/auth');


// entries
router.route('/')
    .get(sessionChecker, async function (req, res, next) {
        let entries = await Entry.mostRecent();
        res.render('entries/index', {entries, login: req.session.user._id});
    })
    .post(async function (req, res, next) {
        const newEntry = new Entry({
            title: req.body.title,
            body: req.body.body,
            author: {id: req.session.user._id, name: req.session.user.username},
            createdAt: new Date().toLocaleString(),
        });
        await newEntry.save();
        res.redirect(`/entries/${newEntry.id}`);
    });

//new entries
router.get('/new', sessionChecker, function (req, res, next) {
    res.render('entries/new');
});

//detail entry
router.route('/:id')
    .get(async function (req, res, next) {
        let entry = await Entry.findById(req.params.id);
            res.render('entries/show', {entry});
    })
    .put(async function (req, res, next) {
        let entry = await Entry.findById(req.params.id);
        entry.title = req.body.title;
        entry.body = req.body.body;
        await entry.save();
        res.redirect(`/entries/${entry.id}`);
    })
    .delete(async function (req, res, next) {
        let entry = await Entry.findById(req.params.id);
        if (entry.author.name === req.session.user.username) {
            await Entry.deleteOne({'_id': req.params.id});
            res.redirect('/');
        } else {
            res.render('entries/show', {entry, error: 'you cant delete this data'});
        }
    });

router.get('/:id/edit', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    if (entry.author.name === req.session.user.username)
        res.render('entries/edit', {entry});
     else
        res.render('entries/show', {entry, error: 'you cant cange this data'});
});
module.exports = router;



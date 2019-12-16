'use strict'

// Base Require

const { join } = require('path');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const mainShema = require(join(_dirname,'..', 'mainShema'));


router.get('/', (req, res) => {
    mainShema.find(null, (err, docs) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Docs: ' + docs);
        }

        res.json({ message: 'Hello World'});
    });
});

router.get('/add', (req, res) => {
    let newArticle = new mainShema({
        name: 'Article de TEST',
        updated_at: Date.now(),
        comments: [{
            name: 'John',
            date: moment().add(7, 'd'),
            comment: 'First ! !'
        }]
    });

    newArticle.save(err => console.error(err));

    res.end();
});

module.export = {
    router
}

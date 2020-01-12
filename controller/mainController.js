'use strict'

// Base Require

const { join } = require('path');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const mainShema = require(join(__dirname,'..','model', 'mainSchema'));


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
        nameService: "Hamboyan_Chancel",
        projects: [
            {
                name: "projet de test",
                desc: "Description du projet, blablabla...",
                daysOff: {Mo: true, Tu: true, We: true, Th: true, Fr: true, Sa: false, Su: false},
                workingHours: {start: moment().hour(), end: moment().hour()},
                task: [{
                    id: 0,
                    name: "tache 1",
                    desc: "toto",
                    start: 1491680626329,
                    end: 1491684607029,
                    percentageProgress: 50,
                    color: "#fc0202",
                    linkedTask: [],
                    ressources: []
                }],
                groupTask: [{name: "optional", start: Date.now(), end: Date.now()}],
                resources: [{name: "Jérémy", cost: 500, type: "humain"}],
                milestones: [{name: "jalon °1", date: Date.now()}]
            }
        ]
    });

    newArticle.save(err => console.error(err));

    res.end();
});

module.export = {
    router
}

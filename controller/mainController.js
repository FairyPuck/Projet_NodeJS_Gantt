'use strict'

// Base Require

const { join } = require('path');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const mainShema = require(join(__dirname,'..','model', 'mainSchema'));

const mongoose = require('mongoose');
const Schema = mongoose.model('Schema');

router.get('/', (req, res) => {
 res.render("Gantt/addTask", {
        viewTitle : "Nouvelle Tâche"
    });
});

router.post('/', (req, res) => {
    console.log("body: ",req.body);
    saveTask(req, res);
});

function saveTask(req, res){
    let schema = new Schema();
    schema.nameService = req.body.nameService;
    schema.nameProject = req.body.name;
    schema.descProject = req.body.desc;
    schema.daysOffProject = [req.body.Mo, req.body.Tu, req.body.We, req.body.Th, req.body.Fr, req.body.Sa, req.body.Su];
    //workingHoursProject = [req.body.taskStart, req.body.taskEnd];
    schema.idTask = req.body.taskID;
    schema.nameTask = req.body.taskName;
    schema.descTask = req.body.taskDesc;
    schema.startTask = (new Date(req.body.taskStart).getTime()/1000);
    schema.endTask = (new Date(req.body.taskEnd).getTime()/1000);
    schema.percentageProgressTask = req.body.percentageProgress;
    schema.colorTask = req.body.Color;
    schema.nameResources = req.body.ressourcesName;
    schema.costRessources = req.body.ressourcesCost;
    schema.typeRessources = req.body.ressourcesType;

    schema.save((err, doc) => {
        if (!err) res.redirect('/');
        else console.log("erreur lors de la sauvegarde : " + err);
    });

}

router.get('/myTask', (req, res) => {
    Schema.find((err, docs) => {
        if (!err) {
            console.log(docs);
            docs.forEach(element => {
                console.log(element.name);
            });
            // res.json(docs);
            res.render("Gantt/myTask", {
                list: docs
            });
        } else {
            console.log('Error in retrieving task list : ' + err);
        }
    });
});

//Route Delete GroupTask by ID
router.delete('/myTask/delete/:id', (req, res) => {
    Schema.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/addTask/myTask');
        } else {
            console.log('Error in task delete : ' + err);
        }
    });
});

module.exports = router;

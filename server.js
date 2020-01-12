'use strict'

//------------------------------------------------Local ----------------------------------
// Base Require
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = 5000;

const io = require('socket.io')(http);

// Création du serveur
http.listen(port, ()=> {
    console.log("Serveur OK !")
})

//routage serveur
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/add', function(req, res) {
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


//------------------------------------------------DataBase----------------------------------
// Base requires
const mongoose = require('mongoose');
const { join } = require('path');

//Mongoose Connect
mongoose.connect('mongodb://localhost:27017/GanttData', {useNewUrlParser: true,  useUnifiedTopology: true}); /*error =>{
    if (error) {
        console.log(error);
        process.exit(1);
    }
});*/
mongoose.Promise = global.Promise;

// Controller requires
//const Controller = require(join(__dirname, 'controller','mainController'));
//app.use('/mainController', Controller);

// Express conf

//---------------------------------------Serveur Central----------------------------
const socket = require('socket.io-client');
let client = socket.connect('http://51.15.137.122:18000', {reconnect: true});

client.on('connect', () => {
    console.log('connected')

    client.emit('needHelp');
    client.on('info', function (contenu) {
        console.log(contenu);
    });

    client.on('projectUpdated', function(projets) {
        console.log(projets);
    })
});



'use strict'

//------------------------------------------------Local ----------------------------------
// Base Require Serveur
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 5000;
const io = require('socket.io')(http);
// Base Require Routage
const { join } = require('path');

// Controller requires
const taskController = require('./controller/taskController');
const mainController = require('./controller/mainController');

// Création du serveur
app.listen(port, ()=> {
    console.log("Serveur OK !")
})
app.use('/task', taskController);
app.use('/Gantt', mainController);
app.use('/Gantt/add', mainController);

//--------------------------------Views--------------------------------------------
const path = require('path');
const exphbs = require ('express-handlebars');


//------------------------------------------------DataBase----------------------------------
// Base requires
const mongoose = require('mongoose');

//Mongoose Connect
mongoose.connect('mongodb://localhost:27017/GanttData', {useNewUrlParser: true,  useUnifiedTopology: true}, error =>{
    if (error) {
        console.log(error);
        process.exit(1);
    }
    else (console.log("MongoDB OK !"))
});
mongoose.Promise = global.Promise;




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

    //client.emit('sendUpdate', function(newArticle));

    client.on('projectUpdated', function(projets) {
        console.log(projets);
    })
});



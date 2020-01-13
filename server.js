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
const mainController = require('./controller/mainController');
const myTaskController = require('./controller/myTaskController')

const path = require('path');
const exphbs = require ('express-handlebars');
const bodyparser = require('body-parser');

//--------------------------------Views--------------------------------------------
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

//--------------------------------------Création du serveur--------------------------------------------------
app.listen(port, ()=> {
    console.log("Serveur OK !")
})
app.use('/addTask', mainController);
app.use('/myTask', myTaskController);

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



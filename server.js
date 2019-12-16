'use strict'

// Base requires
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { join } = require('path');

//Mongoose Connect
mongoose.connect('mongodb://localhost/GanttData', error =>{
    if (error) {
        console.log(error);
        process.exit(1);
    }
});
// Controller requires
const Blog = require(join(_dirname, 'Controller',));

// Express conf
app.use('/blog', Blog.router);

// Server Start
app.listen(6000, () => console.log('Serveur pret !'));

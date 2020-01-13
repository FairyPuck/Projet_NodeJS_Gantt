'use strict'

// Base Require

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.model('Schema');

router.get('/', (req, res) => {
    res.render("Gantt/myTask", {
        viewTitle : "Liste de Tâches"
    });
});

module.exports = router;

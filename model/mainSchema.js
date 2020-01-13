'use strict'

// Base require
const mongoose = require('mongoose');

const moment = require('moment');

const Service = mongoose.Schema;

const mainSchema = new Service({
    nameService: String,
    nameProject: String,
    descProject: String,
    daysOffProject: { Mo: Boolean, Tu: Boolean, We: Boolean, Th: Boolean, Fr: Boolean, Sa: Boolean, Su: Boolean },
    workingHoursProject: { start: Number, end: Number },
    idTask: Number,
    nameTask: String,
    descTask : String,
    startTask : Number,
    endTask : Number,
    percentageProgressTask : Number,
    colorTask : String,
    linkedTaskTask : Array,
    ressourcesTask: String,
    nameGroupTask: String,
    startGroupTask: Number,
    endGroupTask : Number,
    nameResources: String,
    costRessources: Number,
    typeRessources: String,
    nameMilestones: String,
    dateMilestones: Number
});

module.exports = mongoose.model('Schema', mainSchema);

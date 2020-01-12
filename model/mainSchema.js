'use strict'

// Base require
const mongoose = require('mongoose');

const moment = require('moment');

const Service = mongoose.Schema;

const mainSchema = new Service({
    nameService : String,
    projects :
        [
            {
                name : String,
                desc : String,
                daysOff : { Mo : Boolean, Tu : Boolean,  We : Boolean, Th : Boolean, Fr : Boolean, Sa : Boolean, Su : Boolean },
                workingHours : { start : Number, end : Number },
                task : [{ id : Number, name : String, desc : String, start : Number, end : Number, percentageProgress : Number, color : String, linkedTask : Array, ressources : Array }],
                groupTask : [{ name : String, start : Number, end : Number }],
                resources : [{ name : String, cost : Number, type : String }],
                milestones : [{ name : String, date : Number }]
        }]
    });

module.exports = mongoose.model('schema', mainSchema);

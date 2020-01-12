'use strict'

// Base require
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mainSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true},
    created_at: { type: Date, default: Date.now()},
    updated_at: { type: Date, required: true},
    comments: [{
        name: { type: String, required: true, trim: true},
        date: {type: Date, default: Date.now()},
        comment: String
    }]

});

module.export = mongoose.model('shema', mainShema);

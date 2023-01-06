var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notesSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    }
});

var notesModel = mongoose.model('Notes', notesSchema);
module.exports = notesModel;
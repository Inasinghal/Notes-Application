var Notes = require('./notes.model');

exports.createNote = function (req, res) {
    var note = {
        body: req.body.body,
        title: req.body.title
    };

    Notes.create(note, function (err, note) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: 'Note Created Successfully'
            })
        }
    })
}

exports.getNotes = function (req, res) {
    Notes.find({}, function (err, notes) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.send(notes)
        }
    })
}

exports.getNote = function (req, res) {
    Notes.find({ _id: req.params.id }, function (err, note) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.send(note[0])
        }
    })
}

exports.updateNote = function (req, res) {
    var note = {
        body: req.body.body,
        title: req.body.title
    }
    Notes.findOneAndUpdate({ _id: req.params.id }, note, { new: true }, function (err, note) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: 'Note Updated Successfully'
            })
        }
    })
}

exports.removeNote = function (req, res) {
    Notes.findOneAndDelete({ _id: req.params.id }, function (err, note) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: 'Note Deleted Successfully'
            })
        }
    })
}
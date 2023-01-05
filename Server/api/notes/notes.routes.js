// import required essentials
const express = require('express');
var Notes = require('./notes.controller');
// create new router
const router = express.Router();
router.post('/createNote', Notes.createNote);
router.get('/getNotes', Notes.getNotes);
router.get('/getNote/:id', Notes.getNote);
router.put('/updateNote/:id', Notes.updateNote);
router.delete('/removeNote/:id', Notes.removeNote);

module.exports = router;
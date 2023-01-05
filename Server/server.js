var express = require('express');
var properties = require('./config/properties');
var db = require('./config/database');
const cors = require('cors');
var bodyParser = require('body-parser');
var notesRoutes = require('./api/notes/notes.routes');

var app = express();

// call the database connectivity function
db();
var bodyParserJSON = bodyParser.json();
app.use(cors());
app.use(bodyParserJSON);
app.use('/api',notesRoutes);

app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})
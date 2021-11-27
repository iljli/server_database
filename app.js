var express = require('express');
var path = require('path');
const cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors()); //Allowing cors for all origins

const port = process.env.PORT || 3000;

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/sensor');
require("./database/client");
var usersRouter = require('./routes/users');
var sensordataRouter = require('./routes/sensordata');
var measuredDataRouter = require('./routes/measuredData');

const {
  greeting,
  sensor,
} = require('./controllers/controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/greeting', greeting);
app.post('/sensor', sensor);
app.use('/users', usersRouter);
app.use('/sensordata', sensordataRouter);
app.use('/measurements', measuredDataRouter);

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`)
})

module.exports = app;

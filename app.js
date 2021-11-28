var express = require('express');
var path = require('path');
const cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors()); //Allowing cors for all origins

// const port = process.env.PORT || 3000;

require("./database/client");
var usersRouter = require('./routes/users');
var sensordataRouter = require('./routes/sensordata');
var measuredDataRouter = require('./routes/measurements');

/**************************************************/
const {
  greeting,
  sensor,
} = require('./controllers/controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sensor', sensor);                  // interface for the sensor - sensor sends data to here
app.use('/greeting', greeting);               // ToDo
app.use('/users', usersRouter);               // ToDo
app.use('/sensordata', sensordataRouter);     // to create and list sensors
app.use('/measurements', measuredDataRouter); // to get measurements

// app.listen(port, () => { 
//   console.log(`Backend app listening at http://localhost:${port}`) 
// })

module.exports = app;

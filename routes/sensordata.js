var express = require('express');
var router = express.Router();

const Sensor = require("../models/Sensors");


/**************************************************/
// 
// http://localhost:3000/sensordata
/**************************************************/
router.get('/', function (req, res, next) {
  res.send('Placeholder...');
});


/**************************************************/
// create a new sensor
// http://localhost:3000/sensordata/create_sensor
/**************************************************/
router.post('/create_sensor', async (req, res, next) => {
  console.log("Create new Sensor...");
  const { name } = req.body;
  const { loc_name, loc_lat, loc_lng } = req.body.location;
  const { measurement_intervals, alarms } = req.body.config;
  const { is_active } = req.body;

  console.log(name);
  console.log(loc_name);
  console.log(loc_lat);
  console.log(loc_lng);
  console.log(measurement_intervals);
  console.log(alarms);

  // storing the data to MongoDB
  try {
    const newStudent = await Sensor.create({
      name,
      "location": {
        loc_name,
        loc_lat,
        loc_lng
      },
      "config": {
        measurement_intervals,
        alarms
      },
      is_active
    });
    res.json(newStudent);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


/**************************************************/
// list all known Sensors
// http://localhost:3000/sensordata/list_sensors
/**************************************************/
router.get('/list_sensors', async (req, res, next) => {
  console.log("List all known Sensors...");

  try {
    const students = await Sensor.find();
    res.json(students);
  }
  catch (err) {
    res.status(500).send(err);
  }
});





module.exports = router;

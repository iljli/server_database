var express = require('express');
var router = express.Router();

const Sensor = require("../models/Sensors");
const User = require("../models/Users");


/**************************************************/
// 
// http://localhost:3000/sensordata
/**************************************************/
router.get('/', function (req, res, next) {
  res.send('Placeholder...');
});


/**************************************************/
// create a new sensor and attach it to a user
// http://localhost:3000/sensordata/create_sensor
/**************************************************/
router.post('/create_sensor', async (req, res, next) => {
  console.log("Create new Sensor...");
  const { name, user_id } = req.body;
  const { loc_name, loc_lat, loc_lng } = req.body.location;
  const { measurement_intervals, alarms } = req.body.config;
  const { is_active } = req.body;

  console.log(`name: ${name}`);
  console.log(`loc_name: ${loc_name}`);
  console.log(`loc_lat: ${loc_lat}`);
  console.log(`loc_lng: ${loc_lng}`);
  console.log(`measurement_intervals: ${measurement_intervals}`);
  console.log(`alarms: ${alarms}`);

  // storing the data to MongoDB
  try {
    const newSensor = await Sensor.create({
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
    await User.findByIdAndUpdate(user_id, { $push: { sensors: newSensor._id } })
    res.json(newSensor);
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

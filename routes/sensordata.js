var express = require('express');
var router = express.Router();

const Sensor = require("../models/Sensors");
const Measurements = require("../models/Measurements");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/sensor', async (req, res, next) => {
  console.log("Create new Sensor...");

  const { name } = req.body;
  const { loc_name, loc_lat, loc_lng } = req.body.location;
  const { measurement_intervals, alarms } = req.body.config;
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
      }
    });
    res.json(newStudent);
  }
  catch (err) {
    res.status(500).send(err);
  }
});



router.get('/sensor', async (req, res, next) => {
  console.log("List all Sensors...");

  try {
    const students = await Sensor.find();
    res.json(students);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.get('/sensor/:sensor_id', async (req, res, next) => {
  console.log("List all Sensors...");
  const { sensor_id } = req.params;

  try {
    const sensor = await Sensor.find({ _id: sensor_id });
    const measurements = await Measurements.find({ sensor_id });
    const result = {
      sensorData: sensor[0],
      measurementsData: measurements
    }
    // console.log(measurements)
    res.json(result);
  }
  catch (err) {
    res.status(500).send(err);
  }


  // res.send('Here are the Measuremensts');
  // console.log(sensor_id);

  // const query = {"sensor_id": sensor_id};

  // try {
  //   const queryData = await Measurements.find(query);
  //   res.json(queryData);
  // }
  // catch (err) {
  //   res.status(500).send(err);
  // }
});



module.exports = router;

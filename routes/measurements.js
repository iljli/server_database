var express = require('express');
var router = express.Router();

const Sensor = require("../models/Sensors");
const Measurements = require("../models/Measurements");


/**************************************************/
// 
// http://localhost:3000/measurements
/**************************************************/
router.get('/', function (req, res, next) {
  res.send('Placeholder...');
});


/**************************************************/
// list all measurements of sensor_id
// http://localhost:3000/measurements/61a113c27944dd3c610881fa
/**************************************************/
router.get('/:sensor_id', async (req, res, next) => {
  const { sensor_id } = req.params;
  console.log("Get only the measurements from one sensor...");
  console.log(sensor_id);

  const query = { "sensor_id": sensor_id };

  try {
    const queryData = await Measurements.find(query);
    res.json(queryData);
  }
  catch (err) {
    res.status(500).send(err);
  }

});


/**************************************************/
// get Sensordata and its Measurements
// 2. param: limit number of results
// http://localhost:3000/measurements/sensor/61a113c27944dd3c610881fa/20
/**************************************************/
router.get('/sensor/:sensor_id/:countlimit', async (req, res, next) => {
  console.log("Get Sensordata and its Measurements...");
  const { sensor_id, countlimit } = req.params;
  const countlimit_int = Number(countlimit);
  console.log(countlimit_int);

  try {
    const sensor = await Sensor.find({ _id: sensor_id });
    const measurements = await Measurements.find({ sensor_id }).sort({ recorded_at: -1 }).limit(countlimit_int);
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
});

module.exports = router;

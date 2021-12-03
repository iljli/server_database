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


/**************************************************/
// get Sensordata and its Measurements
// 2. param: limit number of results
// http://localhost:3000/measurements/slice/61aa21da85cadafcb845db19/1636502400/1637366400/10
// start: oldest value
// end: newest value
/**************************************************/
router.get('/slice/:sensor_id/:start/:end/:countlimit', async (req, res, next) => {
  console.log("Get Sensordata and its Measurements...");
  let { sensor_id, countlimit, start, end } = req.params;
  let countlimit_int = Number(countlimit);
  console.log(`countlimit_int: ${countlimit_int}`);


  let temp_mw = 0;
  let pres_mw = 0;
  let humi_mw = 0;
  let recd_mw = 0;

  let presentation = [{}];

  try {
    const sensor = await Sensor.find({ _id: sensor_id });

    const recordNewest = await Measurements.find({ sensor_id }, { _id: 0, "recorded_at": 1 }).sort({ recorded_at: -1 }).limit(1);
    const recordOldest = await Measurements.find({ sensor_id }, { _id: 0, "recorded_at": 1 }).sort({ recorded_at: 1 }).limit(1);
    const { recorded_at: newestTimestamp } = recordNewest[0];
    const { recorded_at: oldestTimestamp } = recordOldest[0];
    console.log(`newestTimestamp: ${newestTimestamp}`);
    console.log(`asked start: ${start}`);
    console.log(`asked end: ${end}`);

    if (start < oldestTimestamp) start = oldestTimestamp;
    if (end > newestTimestamp) start = newestTimestamp;

    const measurements = await Measurements.find({ $and: [{ sensor_id }, { recorded_at: { $gt: start, $lt: end } }] }).sort({ recorded_at: -1 });

    const numberOfDatasets = measurements.length;
    if (countlimit_int < 1) countlimit_int = 1;
    if (countlimit_int > numberOfDatasets) countlimit_int = numberOfDatasets;
    const width = Math.floor(numberOfDatasets / countlimit_int);

    console.log(`numberOfDatasets: ${numberOfDatasets}`);
    console.log(`width: ${width}`);


    for (let n = 0; n < numberOfDatasets - width; n = n + width) {
      for (let i = 0; i < width; i++) {
        if (i == 0) {
          temp_mw = Number(measurements[n].temperature)
          pres_mw = Number(measurements[n].pressure)
          humi_mw = Number(measurements[n].humidity)
          recd_mw = Number(measurements[n].recorded_at)
        }
        else {
          temp_mw += Number(measurements[n + i].temperature)
          pres_mw += Number(measurements[n + i].pressure)
          humi_mw += Number(measurements[n + i].humidity)
          recd_mw += Number(measurements[n + i].recorded_at)
        };
      }
      const data = {
        "_id": measurements[n]._id, // unsure - not needed
        "sensor_id": measurements[n].sensor_id, // unsure - not needed
        "__v": measurements[n].__v, // unsure - not needed

        "temperature": (temp_mw / width).toFixed(2),
        "pressure": (pres_mw / width).toFixed(2),
        "humidity": (humi_mw / width).toFixed(2),
        "recorded_at": Math.round(recd_mw / width),
      }

      if (n == 0) presentation[0] = data
      else presentation.push(data);

    }
    // console.log(presentation)


    const result = {
      sensorData: sensor[0],
      measurementsData: presentation,
    }
    // console.log(measurements)
    res.json(result);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

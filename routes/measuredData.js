var express = require('express');
var router = express.Router();

const Sensor = require("../models/Sensors");

/* GET users listing. */
router.get('/:sensor_id', function(req, res, next) {
  const { sensor_id } = req.params;
  res.send('Here are the Measuremensts');
  console.log(sensor_id);


});



router.get('/sensor', async (req, res, next) => {
  console.log("List all Sensors...");

  try {
    const students = await Sensor.find();
    res.json(myData);
  }
  catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;

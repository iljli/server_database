var express = require('express');
var router = express.Router();

const Measurements = require("../models/Measurements");


// list all measurements of sensor_id
// http://localhost:3000/measurements/2

router.get('/:sensor_id', async (req, res, next) => {
  const { sensor_id } = req.params;
  // res.send('Here are the Measuremensts');
  console.log(sensor_id);

  const query = {"sensor_id": sensor_id};

  try {
    const queryData = await Measurements.find(query);
    res.json(queryData);
  }
  catch (err) {
    res.status(500).send(err);
  }

});



module.exports = router;

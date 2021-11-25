var express = require('express');
var router = express.Router();

const Student = require("../models/Sensors");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/student', async (req, res, next) => {
  console.log("Create new Student...");

  const { name, first_name, email } = req.body;
  try {
    const newStudent = await Student.create({
      name,
      first_name,
      email,
    });
    res.json(newStudent);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.get('/student', async (req, res, next) => {
  console.log("List all Students...");

  try {
    const students = await Student.find();
    res.json(students);
  }
  catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;

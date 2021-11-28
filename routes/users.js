var express = require('express');
var router = express.Router();

const User = require("../models/Sensors"); // ToDo - create model and replace

/**************************************************/
// 
// http://localhost:3000/users
/**************************************************/
router.get('/', function (req, res, next) {
  res.send('Placeholder...');
});


/**************************************************/
// 
// http://localhost:3000/create_user
/**************************************************/
router.post('/create_user', async (req, res, next) => {
  console.log("Create new User...");

  const { name, first_name, email } = req.body; // ToDo
  try {
    const newUser = await User.create({
      name,
      first_name,
      email,
    });
    res.json(newUser);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


/**************************************************/
// 
// http://localhost:3000/list_users
/**************************************************/
router.get('/list_users', async (req, res, next) => {
  console.log("List all Users...");

  try {
    const students = await User.find();
    res.json(students);
  }
  catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;

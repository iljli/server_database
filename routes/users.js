const express = require('express');
const router = express.Router();

const User = require("../models/Users"); // ToDo - create model and replace

/**************************************************/
// 
// http://localhost:3000/users/login
/**************************************************/
router.post('/login', async (req, res, next) => {

  const { username, password } = req.body;


  try {
    const [user] = await User.find({ username }).populate('sensors');

    if (!user) {
      return res.status(404).send('No such user')
    }

    if (password !== user.password) {
      return res.status(401).send('Invalid credentials')
    }

    res.json(user);
  }
  catch (err) {
    res.status(500).send(err.message);
  }


});


/**************************************************/
// 
// http://localhost:3000/users/create_user
/**************************************************/
router.post('/create_user', async (req, res, next) => {
  console.log("Create new User...");

  let {   // ToDo: sanitize: https://www.npmjs.com/package/validator
    user_id,
    username,
    first_name,
    last_name,
    email,
    password,
    sensors,
  } = req.body;

  username = username.toLowerCase();
  email = email.toLowerCase();

  try {
    const newUser = await User.create({
      user_id,
      username,
      first_name,
      last_name,
      email,
      password,
      sensors,
    });
    res.json(newUser);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


/**************************************************/
// 
// http://localhost:3000/users/list_users
/**************************************************/
router.get('/list_users', async (req, res, next) => {
  console.log("List all Users...");

  try {
    const data = await User.find();
    res.json(data);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


/**************************************************/
// List userdata and the user's sensors
// http://localhost:3000/users/list_userdata
/**************************************************/
router.post('/list_userdata', async (req, res, next) => {
  console.log("List data of a users...");

  let { username, new_sensor } = req.body;

  if (username) {
    username = username.toLowerCase();
    console.log(username);
    console.log(new_sensor);

    const query = { "username": username }
    try {
      const data = await User.find(query).populate("sensors");
      res.json(data);
    }
    catch (err) {
      res.status(500).send(err);
    }
  } else {
    const err = "Error: No username provided";
    res.status(500).send(err);
  }

});


/**************************************************/
// Add a sensor to a user
// http://localhost:3000/users/update_user_addsensor
// 
// in the html-body:
// {
//     "username": "Bobuser",
//     "new_sensor": "61a3aa28944740a39b9211f2"
// }
/**************************************************/
router.post('/update_user_addsensor', async (req, res, next) => {
  console.log("Add a sensor to user...");

  let { username, new_sensor } = req.body;
  username = username.toLowerCase();
  console.log(username);
  console.log(new_sensor);

  // ToDo: is username and new_sensor defined?

  const query = { "username": username }
  try {
    // const data = await User.find(query);
    const data = await User.updateMany(
      { "username": username },
      { $push: { "sensors": new_sensor } }
    )
    res.json(data);
    // res.json(null);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


/**************************************************/
// Remove a sensor from a user
// http://localhost:3000/users/update_user_removesensor
// 
// in the html-body:
// {
//     "username": "Bobuser",
//     "delete_sensor": "61a3aa28944740a39b9211f2"
// }
/**************************************************/
router.post('/update_user_removesensor', async (req, res, next) => {
  console.log("Remove a sensor from a user...");

  let { username, delete_sensor } = req.body;
  username = username.toLowerCase();
  console.log(username);
  console.log(delete_sensor);

  // ToDo: is username and new_sensor defined?

  const query = { "username": username }
  try {
    // const data = await User.find(query);
    const data = await User.updateOne(
      { "username": username },
      { $pull: { "sensors": delete_sensor } }
    )
    res.json(data);
    // res.json(null);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


/**************************************************/
// Delete a user
// http://localhost:3000/users/delete_user
// 
// in the html-body:
// {
//     "username": "Bobuser",
// }
/**************************************************/
router.post('/delete_user', async (req, res, next) => {
  console.log("Remove a user...");

  let { username } = req.body;
  username = username.toLowerCase();
  console.log(username);

  // ToDo: is username and new_sensor defined?
  if (username) {
    username = username.toLowerCase();

    const query = { "username": username }
    try {
      // const data = await User.find(query);
      const data = await User.deleteOne(
        { "username": username },
      )
      res.json(data);
    }
    catch (err) {
      res.status(500).send(err);
    }
  } else {
    const err = "Error: No username provided";
    res.status(500).send(err);
  }
});


/**************************************************/
// Update a user
// http://localhost:3000/users/update_userdata
// 
// in the html-body:
// * required: username
// * all other params are optional
//  
// {
//   "username": "bobuser",
//   "new_username": "Uschi",
//   "first_name": "Bob",
//   "last_name": "Lastname",
//   "email": "bob.lastname@sensor.de",
//   "password": "secure",
//  }
// * example:
// {
//   "username": "bobuser",
//   "last_name": "Lastname",
//   "password": "secure",
//  }
// 
// ToDo: 
// - security - is setting everything what is provided!
// - validation - need to check for valid values
// 
/**************************************************/
router.post('/update_userdata', async (req, res, next) => {
  console.log("Update userdata...");

  let { username, new_username } = req.body;
  console.log(req.body);
  let updateObj = await req.body;
  console.log(req.body);

  if (username) {
    username = username.toLowerCase();
    if (new_username) {
      new_username = new_username.toLowerCase();
      updateObj.username = new_username;
      delete updateObj.new_username;
      console.log(req.body);
    }

    try {
      const data = await User.updateOne(
        { "username": username },
        { $set: updateObj }
      )
      res.json(data);
    }
    catch (err) {
      res.status(500).send(err);
    }
  } else {
    const err = "Error: No username provided";
    res.status(500).send(err);
  }

});




module.exports = router;

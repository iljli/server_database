const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to Database established successfully");
  })
  .catch((err) => console.log(err));

const client = mongoose.connection;

client.on("error", (err) => console.log(err));

module.exports = client;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measurementSchema = new Schema({
    sensor_id: Schema.Types.ObjectId, // to connect to the Sensors
    temperature: Number,
    pressure: Number,
    humidity: Number,
    recorded_at: Number,
}
)

const Measurement = mongoose.model("Measurement", measurementSchema);

module.exports = Measurement;
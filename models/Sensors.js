const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ObjectId is automatically added by MongoDB

const sensorSchema = new Schema({
    name: {type: String, min: 1, max: 50, required: true},
    location: {
        loc_name: {type: String},
        loc_lat: {type: Number},
        loc_lng: {type: Number}
    },
    config: {
        measurement_intervals: {type: Number},
        alarms: [
            {
                treshold: {type: Number},
                measurement_type: {type: String, enum: ['temperature', 'pressure', 'humidity']},
                operator: {type: String, enum: ["<", "<=", "=", ">=", ">"]}
            }
        ]
    }
    }
)

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
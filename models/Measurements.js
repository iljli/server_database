const mongoose = require('mongoose');
const SchemaMeasurement = mongoose.Schema;

const measurementSchema = new SchemaMeasurement({
    sensor_id: {type: Number},
    temperature: {type: Number},
    pressure: {type: Number},
    humidity: {type: Number},
    recorded_at: {type: Number},
    
    }
)

const Measurement = mongoose.model("SchemaMeasurement", measurementSchema);

module.exports = Measurement;
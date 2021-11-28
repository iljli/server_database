var express = require('express');
var router = express.Router();

const Measurement = require("../models/Measurements")

const greeting = async (req, res, next) => {
    console.log("Greeing...");
    const greetingText = "Welcome to the backend";

    try {
        res.json(greetingText);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const sensor = async (req, res, next) => {
    // console.log("Sensor...");
    const { data } = req.body;
    if (Array.isArray(req.body)) { // several measurements
        const receivedData = req.body;
        console.log(receivedData);
        receivedData.forEach(data => {
            const { sensor_id, recorded_at, pressure, temperature, humidity, carbondioxide, organic } = data;
            console.log(`sensor_id: ${sensor_id}  recorded_at: ${recorded_at}  Pressure: ${pressure} hPa  Temp: ${temperature} °C  Humidtiy: ${humidity}`)

        })
        try {
            const newMeasurement = await Measurement.insertMany(receivedData);
            res.json(newMeasurement);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    } else {
        console.log(req.body); // one measurement
        const { sensor_id, time, pressure, temperature, humidity, carbondioxide, organic } = req.body;
        console.log(`Pressure: ${pressure} hPa  Temp: ${temperature} °C  Humidtiy: ${humidity} % `)
        try {
            const newMeasurement = await Measurement.create({
                "sensor_id": sensor_id,
                "temperature": temperature,
                "pressure": pressure,
                "humidity": humidity,
                "recorded_at": time
            })
            res.json(newMeasurement);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }


    // const greetingText = "Sensor";

    // try {
    //     res.json(greetingText);
    // }
    // catch (err) {
    //     res.status(500).send(err);
    // }
}



module.exports = {
    greeting,
    sensor,
};
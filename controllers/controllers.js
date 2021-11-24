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
    const { time, pressure, temperature, humidity, carbondioxide, organic } = req.body;
    console.log(req.body);
    console.log(`Pressure: ${pressure} hPa  Temp: ${temperature} °C  Humidtiy: ${humidity} %  CO2: ${carbondioxide} ppm  tVOC: ${organic} ppb`)
    
    // console.log(time);
    // console.log(data);
    const greetingText = "Sensor";

    try {
        res.json(greetingText);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    greeting,
    sensor,
};
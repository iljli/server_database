# Datamodel for Sensor-Database-Relation

* used database: MongoDB

User:
{
    _id: ObjectID
    first_name: string
    last_name: string
    email: string
    password: string
    sensors: [
        ObjectIDs
    ]
}


Sensor:
{
    _id
    name: string
    location: {
        loc_name: string
        lat: number
        long: number
    }
    config: {
        measurement_intervals: int
        alarms: [
            {
                treshold: number
                measurement: ENUM ["temperature", "pressure", "humidity"]
                operator: ENUM ["<", "<=", "=", ">=", ">"]
            }
        ]
    }
}


Measurement:
{
    _id
    sensor_id: ObjectID
    temperature: number
    pressure: number
    humidity: number
    recorded_at: timestamp
}


* idea for sensor-authentification: REDIS (cache system) nosql database for token control
* 
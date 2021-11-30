############################################################################
## Create a new user

http://localhost:3000/users/create_user

# Input:

{
    "sensors": ["61a113c27944dd3c610881fa", "61a3a947944740a39b921182"],
    "username": "tomuser",
    "first_name": "Tom",
    "last_name": "Lastname",
    "email": "tom.lastname@sensor.de",
    "password": "secure"
}

# Output:

{
    "username": "tomuser",
    "first_name": "Tom",
    "last_name": "Lastname",
    "email": "bob.lastname@sensor.de",
    "password": "secure",
    "sensors": [
        "61a113c27944dd3c610881fa",
        "61a3a947944740a39b921182"
    ],
    "_id": "61a51e53a704f9ebdb96b379",
    "__v": 0
}

############################################################################
## List all Users

http://localhost:3000/users/list_users

# Input:

- none 

# Output:

[
    {
        "_id": "61a635a8d1e67a94c26d3689",
        "username": "tomuser",
        "first_name": "Tom",
        "last_name": "Lastname",
        "email": "tom.lastname@sensor.de",
        "password": "secure",
        "sensors": [
            {
                "location": {
                    "loc_name": "LocationName4",
                    "loc_lat": 50,
                    "loc_lng": 51
                },
                "config": {
                    "measurement_intervals": 900000,
                    "alarms": [
                        {
                            "treshold": 20,
                            "measurement_type": "temperature",
                            "operator": ">",
                            "_id": "61a638e30a2846a9f92c1196"
                        }
                    ]
                },
                "_id": "61a638e30a2846a9f92c1195",
                "name": "SensorName4",
                "is_active": "true",
                "__v": 0
            },
            {
                "location": {
                    "loc_name": "LocationName5",
                    "loc_lat": 50,
                    "loc_lng": 52
                },
                "config": {
                    "measurement_intervals": 1800000,
                    "alarms": [
                        {
                            "treshold": 20,
                            "measurement_type": "temperature",
                            "operator": ">",
                            "_id": "61a643dd1594bfd4b85973ff"
                        }
                    ]
                },
                "_id": "61a643dd1594bfd4b85973fe",
                "name": "SensorName5",
                "is_active": "true",
                "__v": 0
            }
        ],
        "__v": 0
    }
]

############################################################################
# Add a sensor to a user

http://localhost:3000/users/update_user_addsensor

# Input:
{
    "username": "Bobuser",
    "new_sensor": "61a3aa28944740a39b9211f2"
}

# Output:

{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

############################################################################
# Remove a sensor from a user

http://localhost:3000/users/update_user_removesensor

# Input:

{
    "username": "Bobuser",
    "delete_sensor": "61a3aa28944740a39b9211f2"
}

# Output:

{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

############################################################################
# Delete a user

http://localhost:3000/users/delete_user

# Input:

{
    "username": "Tomuser"
}

# Output:

{
    "deletedCount": 1
}

############################################################################
# Update a user

http://localhost:3000/users/update_userdata

# Input:
* required value: "username"
* optional value: all other

{
  "username": "bobuser",
  "new_username": "Uschi",
  "first_name": "Bob",
  "last_name": "Lastname",
  "email": "bob.lastname@sensor.de",
  "password": "secure",
 }

# Output:

{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

############################################################################
# create a new sensor

http://localhost:3000/sensordata/create_sensor

# Input:

{
    "name": "SensorName4",
    "location": {
        "loc_name": "LocationName4",
        "loc_lat": "50",
        "loc_lng": "51"
    },
    "config": {
        "measurement_intervals": "900000",
        "alarms": {
            "treshold": "20",
            "measurement_type": "temperature",
            "operator": ">"
        }
    },
    "is_active": "true"
}

# Output:

{{
    "name": "SensorName4",
    "location": {
        "loc_name": "LocationName4",
        "loc_lat": 50,
        "loc_lng": 51
    },
    "config": {
        "measurement_intervals": 900000,
        "alarms": [
            {
                "treshold": 20,
                "measurement_type": "temperature",
                "operator": ">",
                "_id": "61a5383f70e4ec677092a922"
            }
        ]
    },
    "is_active": "true",
    "_id": "61a5383f70e4ec677092a921",
    "__v": 0
}


############################################################################
# list all known Sensors

http://localhost:3000/sensordata/list_sensors

# Input:

- none

# Output:

[
    {
        "location": {
            "loc_name": "LocationName",
            "loc_lat": 50,
            "loc_lng": 51
        },
        "config": {
            "measurement_intervals": 60,
            "alarms": [
                {
                    "treshold": 20,
                    "measurement_type": "temperature",
                    "operator": ">",
                    "_id": "61a113c27944dd3c610881fb"
                }
            ]
        },
        "_id": "61a113c27944dd3c610881fa",
        "name": "SensorName",
        "is_active": "true",
        "__v": 0
    },
    {
        "location": {
            "loc_name": "LocationName2",
            "loc_lat": 50,
            "loc_lng": 51
        },
        "config": {
            "measurement_intervals": 3600000,
            "alarms": [
                {
                    "treshold": 20,
                    "measurement_type": "temperature",
                    "operator": ">",
                    "_id": "61a3a947944740a39b921183"
                }
            ]
        },
        "_id": "61a3a947944740a39b921182",
        "name": "SensorName2",
        "is_active": "true",
        "__v": 0
    },
    {
        "location": {
            "loc_name": "LocationName3",
            "loc_lat": 50,
            "loc_lng": 51
        },
        "config": {
            "measurement_intervals": 1800000,
            "alarms": [
                {
                    "treshold": 20,
                    "measurement_type": "temperature",
                    "operator": ">",
                    "_id": "61a3aa28944740a39b9211f1"
                }
            ]
        },
        "_id": "61a3aa28944740a39b9211f0",
        "name": "SensorName3",
        "is_active": "true",
        "__v": 0
    },
    {
        "location": {
            "loc_name": "LocationName4",
            "loc_lat": 50,
            "loc_lng": 51
        },
        "config": {
            "measurement_intervals": 900000,
            "alarms": [
                {
                    "treshold": 20,
                    "measurement_type": "temperature",
                    "operator": ">",
                    "_id": "61a5383f70e4ec677092a922"
                }
            ]
        },
        "_id": "61a5383f70e4ec677092a921",
        "name": "SensorName4",
        "is_active": "true",
        "__v": 0
    }
]

############################################################################
# List all measurements of sensor_id

http://localhost:3000/measurements/61a113c27944dd3c610881fa

# Input:

- parameter in URL = sensor_id

# Output:

[
    {
        "_id": "61a3b23910a402130a1f9ebe",
        "sensor_id": "61a113c27944dd3c610881fa",
        "temperature": 20,
        "pressure": 1010,
        "humidity": 37,
        "recorded_at": 1637906400000,
        "__v": 0
    },
    {
        "_id": "61a3b23910a402130a1f9ebf",
        "sensor_id": "61a113c27944dd3c610881fa",
        "temperature": 19,
        "pressure": 1020,
        "humidity": 37,
        "recorded_at": 1637906400060,
        "__v": 0
    },
    ...
]

############################################################################
# List all measurements of sensor_id

http://localhost:3000/measurements/sensor/61a113c27944dd3c610881fa

# Input:

- parameter in URL = sensor_id

# Output:

{
    "sensorData": {
        "location": {
            "loc_name": "LocationName2",
            "loc_lat": 50,
            "loc_lng": 51
        },
        "config": {
            "measurement_intervals": 3600000,
            "alarms": [
                {
                    "treshold": 20,
                    "measurement_type": "temperature",
                    "operator": ">",
                    "_id": "61a3a947944740a39b921183"
                }
            ]
        },
        "_id": "61a3a947944740a39b921182",
        "name": "SensorName2",
        "is_active": "true",
        "__v": 0
    },
    "measurementsData": [
        {
            "_id": "61a3b3b510a402130a1f9f91",
            "sensor_id": "61a3a947944740a39b921182",
            "temperature": 19,
            "pressure": 1000,
            "humidity": 40,
            "recorded_at": 1638122400000,
            "__v": 0
        },
        {
            "_id": "61a3b3b510a402130a1f9f92",
            "sensor_id": "61a3a947944740a39b921182",
            "temperature": 20,
            "pressure": 990,
            "humidity": 40,
            "recorded_at": 1638122403600,
            "__v": 0
        },
    ...
]
import WeatherModel from "../model/weatherModel.js";
import LocationModel from "../model/locationModel.js";

const HiveController = {

create: async function (req, res) {
  try {
    const { report_date, longitude, latitude, temperature, air_pressure, humidity, wind_speed,precipitiation } = req.body;
    const userId = req.auth.data.id;

    console.log("req body for create weather: ",req.body)
  

    const locationObj = new LocationModel(null, longitude, latitude);
    const insertedLocation = await locationObj.insert(); 

    console.log("location id:", insertedLocation)

    const weather = new WeatherModel(
      null,
      report_date,
      longitude,
      latitude, 
      temperature,
      air_pressure,
      humidity, 
      wind_speed,
      precipitiation
    );

    const insertedWeather = await weather.insert();
    return res.status(200).json(insertedWeather);

  } catch (err) {
    console.log(err);
    res.status(500).send("Napaka pri ustvarjanju vremena");
  }
},

  list:function(req,res){
    const userId = req.auth.data.id
    WeatherModel.getAll()
    .then(hive=>{
      return res.status(200).json(hive);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Napaka pri list weather");
    });
  },
  show:function(req,res){
    const weatherId = req.params.id;
    const userId = req.auth.data.id
    WeatherModel.getById(hiveId,userId)
    .then(weather => {
      return res.status(200).json(weather);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Napaka pri show vremena");
  });
  },
// export default class WeatherModel {
//     constructor(id,report_date,location,temperature,air_pressure,humidity,wind_speed,precipitation) {
//     this.id = id;
//     this.report_date = report_date;
//     this.location = location;
//     this.temperature = temperature;
//     this.air_pressure = air_pressure;
//     this.humidity = humidity;
//     this.wind_speed = wind_speed;
//     this.precipitation = precipitation;
//     }
  update: function(req,res){
    const weatherId = req.params.id || req.body.id;
    const report_date = req.body.report_date ?? null;
    const location_x = req.body.location ?? null;
    const location_y = req.body.location ?? null;
    const temperature = req.body.temperature ?? null;
    const air_pressure = req.body.air_pressure ?? null;
    const humidity = req.body.humidity ?? null;
    const wind_speed = req.body.wind_speed ?? null;
    const precipitiation = req.body.precipitiation ?? null;
    const id_user = req.auth.data.id ?? null;

    const weather = new WeatherModel(weatherId,report_date,location_x,location_y,temperature,air_pressure,humidity,wind_speed,precipitiation);
    weather.update()
    .then(weather => {return res.status(200).json(weather)})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri posodabljanju vremena");
    });
  },

  remove:function(req,res){
    const hiveId = req.params.id ?? req.body.id;  
    const userId = req.auth.data.id

    console.log("hiveid", hiveId)
    console.log("userId", userId)

    WeatherModel.deleteById(hiveId, userId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan panj")})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju hive");
    });
  },
}

export default HiveController;
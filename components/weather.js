const superagent = require('superagent');
require('dotenv').config();
const weather = require('../data/weather.json');
const WEATHERBIT_API = process.env.WEATHERBIT_API;

const handelWeather=(req, res)=> {
 
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_API}&lat=${req.query.lat}&lon=${req.query.lon}`;

    superagent.get(weatherBitUrl).then(weatherBitData => {
      
        const filteredData = weatherBitData.body.data.map(data => new Forcast(data,weatherBitData.body.city_name));
        res.send(filteredData);

    });
}

class Forcast{
    constructor(data,cityName){
      this.cityName=cityName;
      this.description=data.weather.description;
      this.lowTemp=data.low_temp;
      this.maxTemp=data.max_temp;
      this.date=data.valid_date;
    }
  }

  module.exports=handelWeather;
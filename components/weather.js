const superagent = require('superagent');
require('dotenv').config();
const weather = require('../data/weather.json');
const WEATHERBIT_API = process.env.WEATHERBIT_API;
const inMemory = {};


const handelWeather=(req, res)=> {
  if (inMemory[req.query.lat,req.query.lon] !== undefined) { 
    console.log(' we got the data from the memory');
    res.send(inMemory[req.query.lat,req.query.lon])
  }
  else{
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_API}&lat=${req.query.lat}&lon=${req.query.lon}`;

    superagent.get(weatherBitUrl).then(weatherBitData => {
  
      
        const filteredData = weatherBitData.body.data.map(data => new Forcast(data,weatherBitData.body.city_name));
        inMemory[req.query.lat,req.query.lon]=filteredData;
        res.send(filteredData);

    });}
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
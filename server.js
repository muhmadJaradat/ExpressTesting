const express = require('express')
const weather = require('./data/weather.json');
const superagent = require('superagent');
const cors =require('cors');
require('dotenv').config();
const app = express();
let PORT=process.env.PORT
const WEATHERBIT_API = process.env.WEATHERBIT_API;
const MOVIE_API=process.env.MOVIE_API;





app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/weather', (req, res)=> {
  // const data=superagent()
  // let filteredData=data.data.map(data=>{
  //   return( new Forcast(data))
  // })
  // res.send(filteredData)
  
    console.log(req.query);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_API}&lat=${req.query.lat}&lon=${req.query.lon}`;

    superagent.get(weatherBitUrl).then(weatherBitData => {
      
        const filteredData = weatherBitData.body.data.map(data => new Forcast(data,weatherBitData.body.city_name));
        res.send(filteredData);

    });
});

app.get('/movie',(req,res)=>{
  console.log(req.query.query);
const movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&query=${req.query.query}`
superagent.get(movieUrl).then(movieData=>{
  const filteredMovieData=movieData.body.results.map(data=> new Movie(data))
  res.send(filteredMovieData)
 
})

})


class Forcast{
  constructor(data,cityName){
    this.cityName=cityName;
    this.description=data.weather.description;
    this.lowTemp=data.low_temp;
    this.maxTemp=data.max_temp;
    this.date=data.valid_date;
  }
}

class Movie{
  constructor(data){
    this.title=data.title;
    this.overView=data.overview;
    this.avgVotes=data.vote_average;
    this.totalVotes=data.vote_count;
    this.imageURl=`https://image.tmdb.org/t/p/w500${data.poster_path}`;
    this.popularity=data.popularity;
    this.releasedOn=data.release_date;
  }
}

app.listen(PORT,()=> console.log(`listing to the ${PORT}`))
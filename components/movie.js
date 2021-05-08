const superagent = require('superagent');
require('dotenv').config();
const MOVIE_API=process.env.MOVIE_API;
const inMemory = {};


handelMovie=(req,res)=>{
  if (inMemory[req.query.query] !== undefined) { // return cached data only when that ingredient is a key in our memory obj
    // console.log(' we got the data from the memory');
    res.send(inMemory[req.query.query])
  }
  else{
    // console.log('getting the data from the API');
    // console.log(req.query.query);
  const movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&query=${req.query.query}`
  superagent.get(movieUrl).then(movieData=>{
    const filteredMovieData=movieData.body.results.map(data=> new Movie(data))
    inMemory[req.query.query]=filteredMovieData;
    res.send(filteredMovieData)
   
  })}
  
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

  module.exports=handelMovie;
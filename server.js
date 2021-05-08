const express = require('express');
const weatherHandler=require('./components/weather');
const movieHandler=require('./components/movie');
const cors =require('cors');
const app = express();
let PORT=process.env.PORT;



app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/weather',weatherHandler );

app.get('/movie',movieHandler);


app.listen(PORT,()=> console.log(`listing to the ${PORT}`))
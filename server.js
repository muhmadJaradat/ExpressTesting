const express = require('express')
const app = express()
require('dotenv').config()
let PORT=process.env.PORT
const data=require('./data/weather.json')
console.log(data.data);
const cors =require('cors');
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/weather', function (req, res) {
  let filteredData=data.data.map(data=>{
    return( new Forcast(data))
  })
  res.send(filteredData)
})
app.listen(PORT,()=> console.log(`listing to the ${PORT}`))

class Forcast{
  constructor(data){
    this.description=data.weather.description;
    this.date=data.valid_date;
  }
}

const express = require('express')
const app = express()

function getISOTime(time){
  var ISOTime = new Date(time)
  if(isNaN(ISOTime.getTime())) return null
  var fullMonthName = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return fullMonthName[ISOTime.getMonth()].concat(' ', ISOTime.getDate(), ', ', ISOTime.getFullYear())
}

function getUNIXTime(time){
  var UNIXtime = new Date(time)
  if(isNaN(UNIXtime.getTime())) return null
  return UNIXtime.getTime()/1000;
}

app.get('/', function(req, res, next){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('\
  This is tiemstamp api\n\
           \n\
  User stories : \n\
           1. I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)\n\
           2. If it does, it returns both the Unix timestamp and the natural language form of that date.\n\
           3. If it does not contain a date or Unix timestamp, it returns null for those properties.\n\
           \n\
  Example usage: \n\
           https://timestamp-ms.herokuapp.com/December%2015,%202015\n\
           https://timestamp-ms.herokuapp.com/1450137600\n\
           \n\
  Example output: \n\
           { "unix": 1450137600, "natural": "December 15, 2015" }\n')
})

app.get('/:Time', function(req, res){
  var checkNumberOnly = Number(req.params.Time);
  var url_time;
  if(isNaN(checkNumberOnly)){
    url_time = req.params.Time.toString().replace('%20',' ')
    url_time = new Date(url_time);
  }
  else{
   url_time = new Date(+req.params.Time)
   url_time = url_time.getTime()*1000; // convert s to ms
  }
  res.writeHead(200, {'Content-Type' : 'application/json'})
  res.end(JSON.stringify({ 'unix': getUNIXTime(url_time),
                           'natural': getISOTime(url_time) }))
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
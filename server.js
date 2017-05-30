const express = require('express')
const app = express()
var url = require('url')

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
  res.end('Hello World!');
})

/*app.get('/:Time', function (req, res) {
  var time = req.params.Time;
  res.send('Hello World!')
})*/

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
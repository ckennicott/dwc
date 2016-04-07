var express = require('express');

var app = module.exports = express();


app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000'));
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res){ 
  res.sendFile(__dirname + '/dist/index.html'); 
});

app.listen(8082); 
console.log("Starting production instance.");

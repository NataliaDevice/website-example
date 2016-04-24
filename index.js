var express = require('express')
var app = express()
var natalia = require('natalia-nodejs')
var nataliaCilent = new natalia.NataliaClient('6e400001b5a3f393e0a9e50e24dcca9e')
var bodyParser = require('body-parser')

var port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

// Discovers device and setup
nataliaCilent.setup(function() {
  console.log("setup complete")
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/toggle', function(req, res) {
  var query = req.query
  console.log(query)
  var led = parseInt(query.led)
  var state = query.state
  nataliaCilent.toggleLED(led, state, function() {
    res.sendStatus(200)
  })
})

app.listen(port, function() {
  console.log('Listening on port: ' + port)
})

// Turn LED on and off every 5 seconds
// setInterval(function() {
//   nataliaCilent.toggleLED(1, 'on', function() {
//     nataliaCilent.toggleLED(1, 'off')
//   })
// }, 5000)

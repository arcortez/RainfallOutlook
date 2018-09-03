
var express = require('express')
var mysql = require('mysql')
var app = express()
var path = require('path')

//new stuff
var bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})



app.listen(3000)


var express = require('express')
var app = express()
var path = require('path')

//new stuff
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));


//for page traversal via addressbar
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})



app.listen(3000)
console.log("Servre running at localhost:3000")


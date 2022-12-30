const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
// Client-side code
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
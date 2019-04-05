const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3001,function(){
    console.log("Connected");
});
const io = require('socket.io')(server);

const handle_match = require('./controller/Handle_match');
const handle_sending = require('./controller/Handle_sending');
const handle_exiting = require('./controller/Handle_exiting');

let queue = [];
let rooms = {};
let names = {};

app.get('/',(req,res) => {
    res.send("Hello everyone");
})

io.on('connection', function (socket) {
  console.log('User with id ' + socket.id + ' connected');
  
  socket.on('disconnect', handle_exiting(socket,rooms));

  socket.on("find partner", (data) => handle_match(queue,rooms,names,socket,data));

  socket.on("send message", (data) => {handle_sending(socket,rooms,data)});
});
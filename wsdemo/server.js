var express = require('express');
const app = new express();
var server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', socket => {
  console.log('a user connected ' + socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected ' + socket.id);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  setInterval(function(){ 
    io.emit('ticker',{price:Math.random()})
  }, 3000);
  
});


server.listen(8080,() => {
  console.log(`Server is started at port 8080`);
})

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.static('client')); // Serve static files from the client directory

io.on('connection', (socket) => {
  console.log('A user connected');
  io.emit('chat message', 'User connected!')
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('chat message', 'Other user disconnected!')
  });
});

http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
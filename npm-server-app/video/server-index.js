const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path'); // Add this line to import the 'path' module

app.use(express.static('client')); // Serve static files from the client directory

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('video-offer', (offer) => {
    socket.broadcast.emit('video-offer', offer); // Broadcast offer to other users
  });

  socket.on('video-answer', (answer) => {
    socket.broadcast.emit('video-answer', answer); // Broadcast answer
  });

  socket.on('new-ice-candidate', (candidate) => {
    socket.broadcast.emit('new-ice-candidate', candidate); // Broadcast ICE candidate
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname)));

//  Tell Express to serve 'index.html' for the root path ('/')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(3001, () => {
  console.log('Server listening on port 3001');
});
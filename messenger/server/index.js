const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const router = require('./router');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('Have a new Connection!');
  socket.on('disconnect', () => {
    console.log('User had left!');
  });
});

app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

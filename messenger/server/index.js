const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    //Message from the admin when you join.
    socket.emit('message', {
      user: 'admin',
      text: `Welcome to the room ${user.room}`
    });

    // Message to everybody else about your join.
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socket.join(user.room);
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left!');
  });
});

app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

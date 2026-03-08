const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { generateName, releaseName } = require('./nameGenerator');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static client files
app.use(express.static(path.join(__dirname, '../client')));

// Track online users
const onlineUsers = new Map(); // socketId -> username

io.on('connection', (socket) => {
  const username = generateName();
  onlineUsers.set(socket.id, username);
  socket.username = username;

  console.log(`[+] ${username} connected (${socket.id})`);

  // Send the new user their assigned username
  socket.emit('assigned-username', username);

  // Notify everyone about the new user
  io.emit('user-joined', {
    username,
    message: `${username} joined the chat`,
    time: getTime(),
    onlineCount: onlineUsers.size,
  });

  // Send updated user list to all
  io.emit('user-list', Array.from(onlineUsers.values()));

  // Handle incoming chat messages
  socket.on('message', (msg) => {
    if (!msg || typeof msg !== 'string') return;
    const trimmed = msg.trim();
    if (trimmed.length === 0 || trimmed.length > 500) return;

    io.emit('message', {
      username: socket.username,
      message: trimmed,
      time: getTime(),
    });
  });

  // Typing indicators
  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.username);
  });

  socket.on('stop-typing', () => {
    socket.broadcast.emit('stop-typing', socket.username);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const name = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    releaseName(name);

    console.log(`[-] ${name} disconnected`);

    io.emit('user-left', {
      username: name,
      message: `${name} left the chat`,
      time: getTime(),
      onlineCount: onlineUsers.size,
    });

    io.emit('user-list', Array.from(onlineUsers.values()));
  });
});

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const PORT = process.env.PORT || 3000;
// Bind to 0.0.0.0 so all LAN devices can connect
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 LAN Chat server running!`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://<your-local-ip>:${PORT}`);
  console.log(`\n   Find your IP with: ipconfig (Windows) or ifconfig (Mac/Linux)\n`);
});

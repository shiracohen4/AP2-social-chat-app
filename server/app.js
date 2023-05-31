const express = require('express');
const server = express();

const http = require('http');
const app = http.createServer(server);
const { Server } = require("socket.io");
const io = new Server(app);

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));

const path = require('path');

const cors = require('cors');
server.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(express.json({ limit: '25mb' }));

server.use(express.static('public'));

// Route requests to the React app
server.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.get('/chats', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const routerUsers = require('./routes/Users.js');
server.use('/api/Users', routerUsers);

const routerTokens = require('./routes/Tokens.js');
server.use('/api/Tokens', routerTokens);

const routerChats = require('./routes/Chats.js');
server.use('/api/Chats', routerChats);

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on('login', (data) => {
    const username = data.username;
    socket.join(username); // Join the socket room with the user's unique username
    console.log(`User ${username} joined the socket room`);
  });

  socket.on('message', (data) => {
    // Handle the message event here
    console.log(`Received message: ${data.message}`);
    console.log('data: ' + JSON.stringify(data.contact))
    // You can broadcast the message to other clients in the same room
    socket.to(data.contact).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnecting triggered`);
    // for (const [username, value] of socketUserMap) {
    //   if (value === socket) {
    //     socketUserMap.delete(username);
    //     console.log(`User ${username} left the socket room`);
    //     break;
    //   }
    // }
  });

  // ...other event listeners and handlers...
});

//   server.listen(process.env.PORT);
app.listen(process.env.PORT);


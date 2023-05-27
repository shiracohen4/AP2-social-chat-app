const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({extended: true}));

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

server.use(express.json());

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

server.listen(process.env.PORT);

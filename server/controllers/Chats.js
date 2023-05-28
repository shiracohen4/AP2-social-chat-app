const { getChatsService, addChatService } = require('../services/Chats.js');
const { isTokenValid } = require('../services/Tokens.js');

const getChats = async (req, res) => {
    const chats = await getChatsService(req.headers.authorization);
    if (chats === 401) {
        console.log('Failed to get the user`s chats');
    }
    else {
        res.json(chats);
    }
}

const addChat = async (req, res) => {
    const result = await addChatService(req.headers.authorization, req.body.username);
    if (result === 400) {
        res.status(400).send('No such user');
    }
    else if (result === 401) {
        console.log('Could not add chat, current user not found or token expired')
    }
    else {
        res.json(result);
    }
}

module.exports = { getChats, addChat };
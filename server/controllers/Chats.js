const { getChatsService, addChatService, getOneChatService, deleteChatService } = require('../services/Chats.js');

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

const getOneChat = async (req, res) => {

    const result = await getOneChatService(req.headers.authorization, req.params.id);
    console.log(result);
    if (result === 401) {
        res.status(401).send("Error: Unauthorized");
    }
    else if (result === 402) {
        res.status(402).send("chat not foundin db");
    }
    else if (result === 403) {
        res.status(403).send("chat accsess is not allowed due to privaty");
    }
    else {
        res.json(result);
    }

}

const deleteChat = async (req,res) => {
    const result = await deleteChatService(req.headers.authorization, req.params.id);
    console.log("result: " + result);
    if(result === 401){
        res.status(401).send('Error: Unauthorized')
    }
    else if(result === 402){
        res.status(402).send('chat deletion is not allowed due to privaty')
    }
    else if(result === 403){
        res.status(403).send('deleting failed')

    }
    else if(result === 404){
        res.status(404).send('Error: Not Found')

    }
    else{ //deletion succeeded
        res.status(204);
    }

    
}

module.exports = { getChats, addChat, getOneChat, deleteChat };
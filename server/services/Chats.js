const { Message, Chat } = require('../models/Chats.js');
const { User } = require('../models/Users.js');
const { usernameByToken } = require('../services/Tokens.js');

const getChatsService = async (token) => {
    //get username by token
    const currentUsername = usernameByToken(token);
    if (currentUsername === 401) {
        return 401;
    } 
    try {//find all chats connected to this username+Query to find all chats that contain the current username in the "users" field array
        const chats = await Chat.find()
            .populate('users') // Populate the "users" field with User objects and exclude the "_id" field
            .select('id users messages')
            .exec();

        const filteredChats = chats.filter(chat => {            // Filter chats to include only those where currentUsername is present in the users array
            return chat.users.some(user => user.username === currentUsername);
        });

        const chatsToReturn = filteredChats.map(chat => {
            const contact = chat.users.find(user => user.username !== currentUsername);
            const lastMessage = chat.messages[chat.messages.length - 1];

            return {
                id: chat.id,
                user: contact,
                lastMessage: lastMessage
            };
        });
        return chatsToReturn;

    } catch (err) {
        return 401;
    }
}

const addChatService = async (token, username) => { 
    const contact = await User.findOne({ 'username': username }); // check if contact exists in db
    if (!contact || contact === undefined || contact === 0) {
        return 400;
    }
    else {
        const currentUsername = usernameByToken(token);        //save to database
        if (currentUsername === 401) {
            return 401;
        }
        const currentUser = await User.findOne({ 'username': currentUsername });

        const newChat = new Chat({
            'users': [
                currentUser._id,
                contact._id
            ]
        });
        await newChat.save();
        const returnvalue = {
            'id': newChat.id,
            'user': { 'username': contact.username, 'displayName': contact.displayName, 'profilePic': contact.profilePic }
        };

        return returnvalue;

    }
}

module.exports = { getChatsService, addChatService };
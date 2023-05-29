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
        try {
            const currentUsername = usernameByToken(token); //get the current user username 
            var currentUser = await User.findOne({ 'username': currentUsername }); //get the current user full details from the User db
            console.log(currentUser)
        }
        catch {
            return 401;
        }

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

const getOneChatService = async (token, chatId) => {
    const currentUsername = usernameByToken(token); //get the current user username for being sure its his chats.
    if (currentUsername === 401) {
        return 401;
    }


    try { //if the there is not chat like this or the chat doesn't contain the user - return 401 unautorise

        const chat = await Chat.findOne({ id: chatId }) //fidn the required chat in thw whole db (does not matther who is the user the asks for this chat)
            .populate('users')
            .exec();

        if (!chat) {            // No matching chat found
            return 402;
        }
        const isUsersChat = chat.users.some((user) => user.username === currentUsername);            // Do chat include the logged-in user
        if (!isUsersChat) {
            return 403;
        }
        return chat;
    } catch (error) {
        return 400;
    }

}

const deleteChatService = async (token, chatId) => { //todo: make sure that the messages of the caht in the messages db also being deleted
    const currentUsername = usernameByToken(token); //get the current user username for being sure its his chats.
    if (currentUsername === 401) {
        return 401;
    }

    try {
        const chat = await Chat.findOne({ id: chatId }).populate('users'); //extract the chat required for deletion
        if (!chat) { //this chatId not exist
            return 404;
        }

        const currentUser2 = chat.users.find(user => user.username === currentUsername); //make sure the chat belongs to the current user
        if (!currentUser2) {
            return 402;
        }

        await Message.deleteMany({ id: { $in: chat.messages } }); //delete the messages in the db //todo:make sure it works as planned
        await Chat.deleteOne({ id: chatId });
        return 204;
    }
    catch { 
        return 403;
    }






}

module.exports = { getChatsService, addChatService, getOneChatService, deleteChatService };
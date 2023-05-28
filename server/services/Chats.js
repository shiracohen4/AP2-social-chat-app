const { Message, Chat } = require('../models/Chats.js');
const { User } = require('../models/Users.js');
const { usernameByToken } = require('../services/Tokens.js');

const getChatsService = async (token) => {
    //get username by token
    const currentUsername = usernameByToken(token);
    if (currentUsername === 401) {
        return 401;
    }

    //find all chats connected to this username

    // Query to find all chats that contain the current username in the "users" field array
    try {
        const chats = await Chat.find({ 'users.username': currentUsername })
            .populate('users') // Populate the "users" field with User objects and exclude the "_id" field
            .select('id users messages')
            .exec();

        const chatsToReturn = chats.map(chat => {
            const otherUsers = chat.users.filter(user => user.username !== currentUsername);
            const lastMessage = chat.messages[chat.messages.length - 1];

            return {
                id: chat.id,
                users: otherUsers,
                lastMessage: lastMessage
            };
        });

        console.log('chatsToReturn: ' + chatsToReturn);
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
        //save to database
        const currentUsername = usernameByToken(token);
        console.log('currentUsername: ' + currentUsername);
        if (currentUsername === 401) {
            return 401;
        }
        const currentUser = await User.findOne({ 'username': currentUsername });
        console.log('currentUser: ' + currentUser);

        const newChat = new Chat({
            'users': [
                currentUser._id,
                contact._id
            ]
        });
        console.log('1');
        await newChat.save();
        console.log('2');
        const returnvalue = {
            'id': newChat.id,
            'user': {'username': contact.username, 'displayName': contact.displayName, 'profilePic': contact.profilePic}
        };

        console.log('returnvalue: ' + JSON.stringify(returnvalue));
        return returnvalue;

        // const newChat = new Chat({ 'users': [currentUser, contact] });
        // console.log('1');
        // await newChat.save();
        // console.log('2');
        // returnvalue = { 'id': newChat.id, 'user': contact };
        // return returnvalue;
    }
}

module.exports = { getChatsService, addChatService };
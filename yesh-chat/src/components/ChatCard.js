import React, { useState, useEffect } from 'react';
import Message from './Message';
import io from 'socket.io-client';

export const ChatCard = ({ contact, updateContacts, user, logout, setSelectedChat }) => { //the contact.user contain both the user and contact info we need user to distinguish between them
    const [newMessage, setNewMessage] = useState('')
    const [contactInfo, setContactInfo] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    //contact in the input includes:chatid, chat-users, messages.
    //contactInfo contain only the contact info - username display name and picture

    const sendMessageSocket = (chat, message) => {
        if (socket) {
            var contact = 'contact';
            if (chat.users[0].username == user.username) {
                contact = chat.users[1];
            }
            else { contact = chat.users[0]; }

            console.log('contact: ' + JSON.stringify(contact.username) + 'message: ' + JSON.stringify(message));
            socket.emit('message', { contact: contact.username, msg: message.msg, user: user.username, chat: chat });
        }
    }

    useEffect(() => {
        if (user) {
            const socket = io(); // Replace with your server URL
            setSocket(socket);

            socket.on('connect', () => {
                socket.emit('login', { username: user.username }); // Emit a 'login' event with the user's username
            });

            socket.on('alert', async (data) => {
                // Handle the alert event here (show an alert, update UI, etc.)
                alert(`you got new message from ${data.userSender} saying: ${data.msg}`);
                await updateContacts();
                setSelectedChat(data.chat);
                contact = data.chat;
                await updateChat();

                // setSelectedChat(data.chat);

                // if (contactInfo?.username === data.userSender){
                //     console.log('contactInfo: ' + contactInfo);
                //     contact = data.chat;
                //     await updateChat(data.userSender);
                // }
                
                // what worked:
                // contact = data.chat;
                // await updateChat();
                
            });

            return () => {
                socket.disconnect(); // Disconnect the socket when the component unmounts
            };

        }
    }, [user]);

    // try to write updateChat() function, that would be similar to updateContacts()
    const updateChat = async () => {
        if (contact) {
            let token = JSON.parse(localStorage.getItem('token')) || []
            const res4 = await fetch('http://localhost:5000/api/Chats/' + contact.id, {
                'headers': {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token
                }
            })
            if (res4.status !== 200) {
                alert('failed to open this contact chat or token time expired');
                logout();
            }
            const chat = await res4.json();
            setSelectedChat(chat);
            var messages = chat.messages;
            setMessages(messages); 
        }
    }

    const sendNewMessage = async (e) => {
        e.preventDefault();
        const message = { "msg": newMessage };
        let token = JSON.parse(localStorage.getItem('token')) || [];
        const res = await fetch('http://localhost:5000/api/Chats/' + contact.id + '/Messages', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            },
            'body': JSON.stringify(message)
        })
        if (res.status !== 200) {
            alert("failed to send new message or token time expired");
            logout();
        }
        sendMessageSocket(contact, message);
        await updateContacts();
        setMessages(contact.messages);
        setNewMessage('');
    }

    useEffect(() => {
        if (contact) {
            setMessages(contact.messages || []);
            const contactInfoTemp = contact?.users?.find((obj) => obj.username !== user.username);
            setContactInfo(contactInfoTemp);
        }
    }, [contact]);

    const positionScroll = () => {
        const messageElement = document.querySelector('.messages');
        const scrollHeight = messageElement?.scrollHeight;
        const offsetHeight = messageElement?.offsetHeight;
        const scrollTop = scrollHeight - offsetHeight;

        if (messageElement) {
            messageElement.scrollTop = scrollTop;
        }
    }

    useEffect(() => {
        positionScroll();
    }, [messages]);

    useEffect(() => {
        const contactInfoTemp = contact?.users?.find((obj) => obj.username !== user.username) //get the contact 
        setContactInfo(contactInfoTemp);
        positionScroll();
    }, [contact])

    // useEffect(() => {
    //     const handleReceivedMessage = (data) => {
    //       const { userSender, msg } = data;
    //       const message = { content: msg, user: userSender };
    //       setMessages((prevMessages) => [...prevMessages, message]);
    //     };
    
    //     // Listen for the "alert" event emitted from the server
    //     socket.on('alert', handleReceivedMessage);
    
    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //       socket.off('alert', handleReceivedMessage);
    //     };
    // }, [contact]);

    return (
        contact ? (
            <>
                <div className="card-header" id="contactHeader">
                    <img className="contact" src={contactInfo?.profilePic} alt="chica"></img> 
                    <h5 className="contactnameh">{contactInfo?.displayName}</h5> 
                </div>
                <div className="card-body">
                    <div className="chat">
                        <div className="messages">
                            {
                                messages?.map((message) =>
                                    <Message message={message} user={user} />
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="card-footer text-body-secondary">
                    <form onSubmit={sendNewMessage}>
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="form-control"
                            placeholder="New message here..."
                            id="message"
                        />
                        <button type="submit" className="btn btn-secondary" id="sendbutton">Send</button>
                    </form>
                </div>
            </>
        ) : (
            <div>
                <img src="logo.png" alt="" style={{ width: 250 }} />
            </div>
        )
    )
}
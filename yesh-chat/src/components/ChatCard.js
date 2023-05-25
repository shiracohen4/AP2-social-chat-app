import React, { useState, useEffect } from 'react';
import Message from './Message';

export const ChatCard = ({ contact, updateContacts }) => {
    const [newMessage, setNewMessage] = useState('')
    const sendNewMessage = (e) => {
        e.preventDefault();
        const message = {
            text: newMessage,
            time: new Date(),
            mine: true
        }
        const contacts = JSON.parse(localStorage.getItem('contacts'))
        const contactIndex = contacts.findIndex(chosenContact => chosenContact.displayName === contact.displayName)

        contacts[contactIndex].messages.push(message);
        localStorage.setItem('contacts', JSON.stringify(contacts))
        updateContacts();
        setNewMessage('');
    }
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
    }, [contact])

    return (
        contact ? (
            <>
                <div className="card-header" id="contactHeader">
                    <img className="contact" src={contact.profilePic} alt="chica"></img>
                    <h5 className="contactnameh">{contact.displayName}</h5>
                </div>
                <div className="card-body">
                    <div className="chat">
                        <div className="messages">
                            {
                                contact.messages.map((message) =>
                                    <Message message={message} />
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
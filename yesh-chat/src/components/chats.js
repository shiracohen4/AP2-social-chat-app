import { useState, useEffect } from 'react';
import '../styles/chats.css';
import ContactListHeader from './ContactListHeader';
import ContactList from './ContactList';
import { ChatCard } from './ChatCard';


export const Chats = ({ user }) => {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)

    const updateContacts = async () => { //get all the contacts from the db and update in the contact state for rendering
        let token = JSON.parse(localStorage.getItem('token')) || []
        const res2 = await fetch('http://localhost:5000/api/Chats', {
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token,
            }
        })
        const newContacts = await res2.json();
        setContacts(newContacts);
        if (selectedContact) {
            const contact = newContacts.find((contact) =>
                contact.user.displayName === selectedContact.user.displayName)
            setSelectedContact(contact);
        }
        const res4 = await fetch('http://localhost:5000/api/Chats/' + selectedContact.id, {
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        })
        if (res4.status !== 200) {
            alert('failed open this contact chat or token time expired');
            logout();
        }
        const chat = await res4.json();
        setSelectedChat(chat);       //setSelectedChat

        // const newContacts = JSON.parse(localStorage.getItem('contacts'))
        // setContacts(newContacts)
        // if (selectedContact) {
        //     const contact = newContacts.find((contact) =>
        //         contact.displayName === selectedContact.displayName)
        //     setSelectedContact(contact);
        // }
    }

    const addNewContact = async (e, newContactUsername) => { //getch post to add new contact + render the contact list
        e.preventDefault();
        const newContact = { "username": newContactUsername };
        let token = JSON.parse(localStorage.getItem('token')) || []
        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token,
            },
            'body': JSON.stringify(newContact)
        })
        if (res.status !== 200) {
            alert('username does not exist');
        }
        updateContacts();

        // const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        // const response = await fetch('https://randomuser.me/api/');
        // const data = await response.json()
        // const profilePic = data.results[0].profilePic.medium;
        // const contact = {
        //     displayName: newContact,
        //     messages: [],
        //     profilePic // --> picture : picture
        // }

        // contacts.push(contact);
        // localStorage.setItem('contacts', JSON.stringify(contacts))
        // updateContacts();
    }

    const selectContact = async (contact) => { //if the user clicked a contact - update the selected contact and its chat in the state variables
        setSelectedContact(contact);
        let token = JSON.parse(localStorage.getItem('token')) || []        //get the full chat with the selected contact
        const res3 = await fetch('http://localhost:5000/api/Chats/' + contact.id, {
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        })
        if (res3.status !== 200) {
            alert('failed open this contact chat or token time expired');
            logout();
        }
        const chat = await res3.json();
        setSelectedChat(chat);       //setSelectedChat


    }

    const logout = () => {
        localStorage.removeItem('user');
        // localStorage.removeItem('contacts'); //not really suposed to delete - change this  to make the chats persistant
        window.location.href = '/';
    }

    useEffect(() => {
        updateContacts();
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <button
                type="button"
                className="btn btn-danger"
                id="logout"
                onClick={logout}
            >
                Logout
            </button>
            <div className="chats">
                <div className="card text-center border-dark" id="chatlistCard">
                    <ContactListHeader user={user} addNewContact={addNewContact} />
                    <ContactList
                        contacts={contacts}
                        selectContact={selectContact}
                    />
                </div>
                <div className="card text-center border-dark" id="chatcontent">
                    <ChatCard
                        contact={selectedChat} //change to selected chat
                        updateContacts={updateContacts}
                        user={user}
                        logout={logout}
                    />
                </div>
            </div>
            <br />
            <br />
        </>
    );
}

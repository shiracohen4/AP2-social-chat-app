import { useState, useEffect } from 'react';
import '../styles/chats.css';
import ContactListHeader from './ContactListHeader';
import ContactList from './ContactList';
import { ChatCard } from './ChatCard';


export const Chats = ({ user }) => {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)

    const updateContacts = () => {
        const newContacts = JSON.parse(localStorage.getItem('contacts'))
        setContacts(newContacts)
        if (selectedContact) {
            const contact = newContacts.find((contact) => 
                contact.displayName === selectedContact.displayName)
            setSelectedContact(contact);
        }
    }
    const addNewContact = async (e, newContact) => {
        e.preventDefault();
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json()
        const picture = data.results[0].picture.medium;
        const contact = {
            displayName: newContact,
            messages: [],
            picture
        }

        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts))
        updateContacts();
    }
    const selectContact = (contact) => {
        setSelectedContact(contact)
    }
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('contacts');
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
                        contact={selectedContact}
                        updateContacts={updateContacts}
                    />
                </div>
            </div>
            <br />
            <br />
        </>
    );
}

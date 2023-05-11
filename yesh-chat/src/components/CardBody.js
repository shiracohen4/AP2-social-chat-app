import React, { useEffect, useState } from 'react';
import Contact from './Contact'

const CardBody = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        setContacts(JSON.parse(localStorage.getItem('contacts')) || []);
    }, [])
    return (
        <div className="card-body">
            <ul id="chatList">
                {contacts.map((contact) => {
                    console.log(contact);
                    return (
                        <Contact contact={contact} />
                    )
                })}
            </ul>
        </div>
    )
}

export default CardBody;
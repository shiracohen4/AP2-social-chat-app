import React from 'react';
import { formatTime } from '../utils/formatTime';

const Contact = ({ contact, selectContact }) => {
    return (
        <li 
            className='contactList' 
            onClick={async () => await selectContact(contact)}
            style={{cursor: 'pointer'}}
        >
            <img className="contact" src={contact.user.profilePic} alt="chica" />
            <div style={{
                paddingLeft: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
                <h5 className="contactname">{contact.user.displayName}</h5>
                <div cladatessName="last-msg">{contact.lastMessage?.content}</div>
            </div>
            <h6 className="date">{formatTime(contact.lastMessage?.created)}</h6>
        </li>
    )
}

export default Contact;
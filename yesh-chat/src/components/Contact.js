import React from 'react';
import { formatTime } from '../utils/formatTime';

const Contact = ({ contact, selectContact }) => {
    return (
        <li 
            className='contactList' 
            onClick={() => selectContact(contact)}
            style={{cursor: 'pointer'}}
        >
            <img className="contact" src={contact.profilePic} alt="chica" />
            <div style={{
                paddingLeft: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
                <h5 className="contactname">{contact.displayName}</h5>
                <div className="last-msg">{contact.messages[contact.messages.length - 1]?.text}</div>
            </div>
            <h6 className="date">{formatTime(contact.messages[contact.messages.length - 1]?.time)}</h6>
        </li>
    )
}

export default Contact;
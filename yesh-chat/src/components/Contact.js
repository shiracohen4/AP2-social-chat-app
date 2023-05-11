import React from 'react';

const Contact = ({ contact }) => {
    return (
        <li className='contactList'>
            <img className="contact" src={contact.picture} alt="chica" />
            <h5 className="contactnameb">{contact.displayName}</h5>
            <div className="lastMsg">woof-woof</div>
            <h6 className="date">3/31/2023, 15:24</h6>
        </li>
    )
}

export default Contact;
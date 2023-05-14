import React, { useEffect, useState } from 'react';
import Contact from './Contact'

const ContactList = ({ contacts, selectContact }) => {
    const sortByLastMessageTime = (a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];

        if (!lastMessageA || !lastMessageB) { return -1 }
        if (lastMessageA.time < lastMessageB.time) {
            return 1;
        } else if (lastMessageA.time > lastMessageB.time) {
            return -1;
        } else {
            return 0;
        }
    }

    return (
        <div className="card-body">
            <ul id="chatList">
                {contacts?.sort(sortByLastMessageTime).map((contact) => {
                    return (
                        <Contact
                            contact={contact}
                            selectContact={selectContact}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default ContactList;
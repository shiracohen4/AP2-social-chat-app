import React from 'react';
import { formatTime } from '../utils/formatTime'

const Message = ({ message }) => {

    return (
        <div className={`${message.mine ? 'mine' : 'yours'} message last`}>
            {message.text}
            <div className="msgTime mine">{formatTime(message.time)}</div>
        </div>
    )
}

export default Message;




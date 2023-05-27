const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPassName = new Schema(
    {
        'username': {
            type: String,
            required: true,
            default: null
        },
        'password': {
            type: String,
            required: true,
            default: null
        },
        'displayName': {
            type: String,
            required: true,
            default: null
        },
        'profilePic': {
            type: String,
            required: true,
            default: null
        }
    }
);

const User = new Schema(
    {
        'username': {
            type: String,
            required: true,
            default: null
        },
        'displayName': {
            type: String,
            required: true,
            default: null
        },
        'profilePic': {
            type: String,
            required: true,
            default: null
        }
    }
);


// module.exports = mongoose.model('UserPassName', UserPassName);
// module.exports = mongoose.model('User', User);

module.exports = {
    'UserPassName': mongoose.model('UserPassName', UserPassName),
    'User': mongoose.model('User', User)
};
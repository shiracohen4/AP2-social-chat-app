// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const UserPassName = new Schema(
//     {
//         'username': {
//             type: String,
//             required: true
//         },
//         'password': {
//             type: String,
//             required: true
//         },
//         'displayName': {
//             type: String,
//             required: true
//         },
//         'profilePic': {
//             type: String,
//             required: true
//         }
//     }
// );

// const User = new Schema(
//     {
//         'username': {
//             type: String,
//             required: true
//         },
//         'displayName': {
//             type: String,
//             required: true
//         },
//         'profilePic': {
//             type: String,
//             required: true
//         }
//     }
// );

// const Message = new Schema(
//     {
//         'id': {
//             type: Number,
//             default: function () {
//                 // Find the maximum id value in the collection and increment it
//                 return this.constructor.countDocuments().exec().then((count) => count + 1);
//             }
//         },
//         'created': {
//             type: Date,
//             default: Date.now
//         },
//         'sender': {
//             type: User,
//             required: true
//         },
//         'content': {
//             type: String,
//             required: true
//         }

//     }
// );

// const Chat = new Schema(
//     {
//         'id': {
//             type: Number,
//             default: function () {
//                 // Find the maximum id value in the collection and increment it
//                 return this.constructor.countDocuments().exec().then((count) => count + 1);
//             }
//         },
//         'users': [
//             {
//                 type: User,
//                 required: true
//             }
//         ],
//         'messages': [
//             {
//                 type: Message
//             }
//         ]
//     }
// );

// module.exports = {
//     'UserPassName': mongoose.model('UserPassName', UserPassName),
//     'User': mongoose.model('User', User),
//     'Message': mongoose.model('Message', Message),
//     'Chat': mongoose.model('Chat', Chat)
// };
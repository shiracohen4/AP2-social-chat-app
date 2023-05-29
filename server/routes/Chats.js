const express = require('express');
const router = express.Router();

const { getChats, addChat,getOneChat } = require('../controllers/Chats.js');
const { isLoggedIn } = require('../controllers/Users.js')

router.route('/').get(isLoggedIn, getChats);
router.route('/').post(isLoggedIn, addChat);
router.route('/:id').get(isLoggedIn, getOneChat);

module.exports = router;
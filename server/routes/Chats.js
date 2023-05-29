const express = require('express');
const router = express.Router();

const { getChats, addChat ,getOneChat, deleteChat } = require('../controllers/Chats.js');
const { isLoggedIn } = require('../controllers/Users.js')

router.route('/').get(isLoggedIn, getChats);
router.route('/').post(isLoggedIn, addChat);
router.route('/:id').get(isLoggedIn, getOneChat);
router.route('/:id').delete(isLoggedIn, deleteChat); //pay attention : the delete refreshes only after refreshing or calling to the server with get chats. might be solved using socketServices in part3

module.exports = router;
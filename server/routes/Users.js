const express = require('express');
const router = express.Router();

// import {addUser} from '../controllers/Users.js';
const { createUser } = require('../controllers/Users.js');
// router.post('/', createUser);
router.route('/').post(createUser);

module.exports = router;
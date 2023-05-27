const { UserPassName } = require('../models/Users.js');
const jwt = require("jsonwebtoken");

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";

const createTokenService = async ({ username, password }) => {
    const user = await UserPassName.find({ username, password });
    if (!user || user === undefined || user.length === 0) {
        return {
            'status': 404,
            'body': 'Incorrect username and/or password'
        }
    }
    const data = { username: req.body.username }
    // Generate the token.
    const token = jwt.sign(data, key)
    // Return the token to the browser
    res.status(200).json({ token });

}

module.exports = { createTokenService };
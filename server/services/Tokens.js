const { UserPassName } = require('../models/Users.js');
const jwt = require("jsonwebtoken");

const key = "hemihemi";

const createTokenService = async ({ username, password }) => {
    const user = await UserPassName.find({ username, password });
    if (!user || user === undefined || user.length === 0) {
        return {
            'status': 404,
            'body': 'Incorrect username and/or password'
        }
    }
    const data = { username }
    // Generate the token
    const token = jwt.sign(data, key)
    // Return the token to the browser
    return {
        'status': 200,
        'body': token
    }
}

const isTokenValid = (headers) => {
    if (headers.authorization) {
        // Extract the token from that header
        const token = headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            // Token validation was successful
            return 200;
        } catch (err) {
            return 401;
        }
    }
    else {
        return 403;
    }

}

const usernameByToken = (tokenWithBearer) => {
    const token = tokenWithBearer.split(" ")[1];
    try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        // Token validation was successful
        return data.username;
    } catch (err) {
        return 401;
    }
}

module.exports = { createTokenService, isTokenValid, usernameByToken };
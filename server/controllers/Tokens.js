const {createTokenService} = require('../services/Tokens.js');

const createToken = async (req, res) => {
    const result = await createTokenService(req.body);
    if (result.status === 404) {
        res.status(404).send(result.body);
    }
    
}

module.exports = {createToken};
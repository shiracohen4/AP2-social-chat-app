const {addUser} = require('../services/Users.js');
const createUser = async (req, res) => {
    const result = await addUser(req.body);
    // console.log(result);
    if (result === 409){
        res.status(409).send('Conflict');
    }
    else{
        res.json(result);
    }
}

module.exports = {createUser};
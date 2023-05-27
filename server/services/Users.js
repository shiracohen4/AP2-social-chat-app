const { UserPassName, User } = require('../models/Users.js');

const addUser = async ({ username, password, displayName, profilePic }) => {
    const newUserWithPas = new UserPassName({ username, password, displayName, profilePic });

    const alreadyTaken = await UserPassName.find({ 'username': username });
    console.log('alreadyTaken: ' + alreadyTaken);

    if (!alreadyTaken || alreadyTaken === undefined || alreadyTaken.length === 0) {
        await newUserWithPas.save();
        console.log(newUserWithPas);
        const newUser = new User({ username, displayName, profilePic });
        console.log(newUser);
        return await newUser.save(); //check that it returns 'user' as a response
    }
    else {return 409;}
}

module.exports = { addUser };
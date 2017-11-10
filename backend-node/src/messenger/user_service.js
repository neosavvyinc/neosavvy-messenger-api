import * as UserDataAccess from './user_data'

export const addUser = async (user) => {
    if( user && !user.username) {
        throw new Error('Username was not provided, please provide a username')
    }

    if( user && !user.password ) {
        throw new Error('Password was not provided, please provide a password')
    }

    const existing = UserDataAccess.findUserByUsername(user.username);
    if(existing) {
        throw new Error('Please provide a unique username');
    }

    const insertedUser = await UserDataAccess.insertUser(user);
    return insertedUser.id;
};

export const findAllUsers = async () => {
    const users = await UserDataAccess.findAllUsers();
    return users;
};


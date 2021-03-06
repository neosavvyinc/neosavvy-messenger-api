import findOrInitializePool from './database_pool_wrapper';

import _ from 'lodash';

export const findUserByUsername = () => {
};

export const findAllUsers = () => {
    const usersPromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection(async (err, connection) => {
                if (err) {
                    reject(err)
                }
                connection.query('SELECT id, username FROM users',  (err, results, fields) => {
                    if (err) {
                        connection.release();
                        reject(err)
                    }
                    connection.release();
                    resolve(_.map(results, (result) => {
                        return _.merge({}, result);
                    }));
                });
            });
        }
    );

    return usersPromise;

};
export const insertUser = async (user) => {
    const usersPromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query('INSERT INTO users SET ?', user, (err, results, fields) => {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    const returnValue = _.merge({}, {id: results.insertId});
                    connection.release();
                    resolve(returnValue)
                });
            });
        }
    );

    return usersPromise
};
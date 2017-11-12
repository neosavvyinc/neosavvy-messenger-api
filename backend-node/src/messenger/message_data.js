import findOrInitializePool from './database_pool_wrapper';

import _ from 'lodash';

export const findMessages = async () => {
    const messagePromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection(async (err, connection) => {
                if (err) {
                    reject(err)
                }
                connection.query('SELECT * FROM messages_view',  (err, results, fields) => {
                    if (err) {
                        connection.release();
                        reject(err)
                    }
                    connection.release();
                    const resultObjects = _.map(results, (result) => {
                        return _.merge({}, result);
                    });
                    console.log('resultObjects: ', resultObjects);
                    resolve(resultObjects);
                });
            });
        }
    );

    return messagePromise;
};

export const insertParentMessage = async (parentMessage) => {
    const messagePromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query('INSERT INTO messages SET ?', parentMessage, (err, results, fields) => {
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

    return messagePromise
};

export const insertTextMessage = async (textMessage) => {
    const messagePromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query('INSERT INTO messages_text SET ?', textMessage, (err, results, fields) => {
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

    return messagePromise
};

export const insertVideoMessage = async (videoMessage) => {
    const messagePromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query('INSERT INTO messages_video SET ?', videoMessage, (err, results, fields) => {
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

    return messagePromise
};

export const insertImageMessage = async (imageMessage) => {
    const messagePromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query('INSERT INTO messages_image SET ?', imageMessage, (err, results, fields) => {
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

    return messagePromise
};
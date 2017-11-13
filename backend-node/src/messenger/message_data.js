import findOrInitializePool from './database_pool_wrapper';

import _ from 'lodash';
import mysql from 'mysql';

export const findMessages = async ({
    senderId,
    receiverId,
    pageNumber = undefined,
    pageSize = undefined
}) => {
    const messagePromise = new Promise(
        (resolve, reject) => {
            findOrInitializePool().getConnection(async (err, connection) => {
                if (err) {
                    reject(err)
                }
                let sentAndReceivedQuerySQL= 'SELECT * FROM (' +
                    '  SELECT *' +
                    '  FROM messages_view sent' +
                    '  WHERE sender_id = ? AND receiver_id = ?' +
                    '  UNION ALL' +
                    '  SELECT *' +
                    '  FROM messages_view received' +
                    '  WHERE sender_id = ? AND receiver_id = ?' +
                    ') as conversation ORDER BY created DESC, id DESC';
                let insertions = [senderId, receiverId, receiverId, senderId];
                if(pageNumber && pageSize && pageNumber >= 0 && pageSize >= 0 ) {
                    const offset = pageNumber * pageSize;
                    sentAndReceivedQuerySQL = sentAndReceivedQuerySQL + ` LIMIT ${pageSize} OFFSET ${offset}`;
                }
                const senderAndReceiverQueryStatement = mysql.format(sentAndReceivedQuerySQL, insertions);
                connection.query(senderAndReceiverQueryStatement,  (err, results, fields) => {
                    if (err) {
                        connection.release();
                        reject(err)
                    }
                    connection.release();
                    const resultObjects = _.map(results, (result) => {
                        return _.merge({}, result);
                    });
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
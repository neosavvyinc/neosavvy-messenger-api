import {
    BASE_USER_ROUTE,
    GET_USERS,
    NEW_USER,
    UPDATE_USER,
    DELETE_USER
} from './user_routes';

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
const db = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'testpass',
    database: 'challenge',
});

app.get('/health', (request, response) => {
    response.json({
        'status': 'ok'
    });
});

app.get(`${BASE_USER_ROUTE}`, GET_USERS);
app.post(`${BASE_USER_ROUTE}`, NEW_USER);
app.put(`${BASE_USER_ROUTE}/:id`, UPDATE_USER);
app.delete(`${BASE_USER_ROUTE}/:id`, DELETE_USER);

// app.get(`/messages/:userId(\d)?`, ( request, response ) => {
//     // Query Params
//     // const pageNumber = request.query.page;
//     // const pageSize = request.query.size;
//
//     // Collection of recipients from Request
//     // Verify URL Path Provided User is valid
//     // Verify All Recipient IDs are valid
//     // Merge all UserIds into Involved Parties Collection
//     // Query All Messages between involved Parties
//     // Return full List
//
//     response.json({})
// });
//
// app.post(`/messages/:userId(\d)`, () => { response.json({})});
//
// app.get('/test', function (req, res) {
//     db.getConnection(function (err, connection) {
//         if (err) {
//             res.status(501).send(err.message);
//             return;
//         }
//         connection.query('SELECT col FROM test', function (err, results, fields) {
//             if (err) {
//                 res.status(501).send(err.message);
//                 connection.release();
//                 return;
//             }
//
//             res.json({
//                 result: results[0].col,
//                 backend: 'nodejs',
//             });
//             connection.release();
//         });
//     });
// });

app.listen(8000, () => {
    console.log('Listening on port 8000');
});

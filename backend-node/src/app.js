import {
    BASE_USER_ROUTE,
    GET_USERS,
    NEW_USER,
    UPDATE_USER,
    DELETE_USER
} from './messenger/user_routes';

import {
    BASE_MESSAGE_ROUTE,
    SEND_TEXT_MESSAGE,
    SEND_IMAGE_MESSAGE,
    SEND_VIDEO_MESSAGE,
    FETCH_MESSAGES
} from './messenger/message_routes';

import {
    HEALTH_TEST
} from "./messenger/health_routes";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

/**
 * User Endpoints
 */
app.get(`${BASE_USER_ROUTE}`, GET_USERS);
app.post(`${BASE_USER_ROUTE}`, NEW_USER);
app.put(`${BASE_USER_ROUTE}/:id`, UPDATE_USER);
app.delete(`${BASE_USER_ROUTE}/:id`, DELETE_USER);

/**
 * Message Endpoints
 */
app.post(`${BASE_MESSAGE_ROUTE}/:senderId/text`, SEND_TEXT_MESSAGE);
app.post(`${BASE_MESSAGE_ROUTE}/:senderId/image`, SEND_IMAGE_MESSAGE);
app.post(`${BASE_MESSAGE_ROUTE}/:senderId/video`, SEND_VIDEO_MESSAGE);
app.get(`${BASE_MESSAGE_ROUTE}/:userId`, FETCH_MESSAGES);

/**
 * Health
 */
app.get('/test', HEALTH_TEST);

app.listen(8000, () => {
    console.log('Listening on port 8000');
});

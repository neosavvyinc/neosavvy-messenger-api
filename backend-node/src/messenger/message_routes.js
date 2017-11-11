import * as MessageService from './message_service';
import _ from 'lodash';


export const BASE_MESSAGE_ROUTE = '/messages';

export const SEND_TEXT_MESSAGE = async (request, response) => {
    const senderId = request.params.senderId;
    const receiverId = request.body.receiverId;
    const message = request.body.message;

    await MessageService.addTextMessage(senderId, receiverId, message);
    response.json({'status': 'unimplemented'})
};

export const SEND_IMAGE_MESSAGE = (request, response) => {

    response.json({'status': 'unimplemented'})
};

export const SEND_VIDEO_MESSAGE = (request, response) => {

    response.json({'status': 'unimplemented'})
};

export const FETCH_MESSAGES = async (request, response) => {
    const messages = await MessageService.findMessages();
    response.json({'messages': messages});
};

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
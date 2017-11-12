import * as MessageService from './message_service';
export const BASE_MESSAGE_ROUTE = '/messages';

export const SEND_TEXT_MESSAGE = async (request, response) => {
    const senderId = request.params.senderId;
    const receiverId = request.body.receiverId;
    const message = request.body.message;

    await MessageService.addTextMessage(senderId, receiverId, message);
    response.sendStatus(200);
};

export const SEND_IMAGE_MESSAGE = async (request, response) => {
    const senderId = request.params.senderId;
    const receiverId = request.body.receiverId;
    const message = request.body.message;
    const link = request.body.link;
    const image_height = request.body.image_height;
    const image_width = request.body.image_width;

    await MessageService.addImageMessage(senderId, receiverId, message, link, image_height, image_width);
    response.sendStatus(200);
};

export const SEND_VIDEO_MESSAGE = async (request, response) => {
    const senderId = request.params.senderId;
    const receiverId = request.body.receiverId;
    const message = request.body.message;
    const video_length = request.body.video_length;
    const video_source = request.body.video_source;

    await MessageService.addVideoMessage(senderId, receiverId, message, video_length, video_source);
    response.sendStatus(200);
};

export const FETCH_MESSAGES = async (request, response) => {
    const messages = await MessageService.findMessages();
    response.json({'messages': messages});
};
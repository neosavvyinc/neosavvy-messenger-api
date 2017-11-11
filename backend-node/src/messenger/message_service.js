import * as MessageDataAccess from './message_data';

export const addTextMessage = async (senderId, receiverId, message) => {
    // TODO: Verify both sender and receiver ids are real - otherwise throw errors....
    return await MessageDataAccess.insertTextMessage({
        type: 'text',
        sender_id: senderId,
        receiver_id: receiverId,
        message
    })

};

export const addImageMessage = (sender, receiver, message) => {

};

export const addVideoMessage = (sender, receiver, message) => {

};

export const findMessages = async () => {
    const messages = await MessageDataAccess.findMessages();
    return messages;
}
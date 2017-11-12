import * as MessageDataAccess from './message_data';

export const addTextMessage = async (senderId, receiverId, message) => {
    // TODO: Verify both sender and receiver ids are real - otherwise throw errors....
    const { id } =  await MessageDataAccess.insertParentMessage({
        type: 'text',
        sender_id: senderId,
        receiver_id: receiverId,
        message
    });

    return await MessageDataAccess.insertTextMessage({
        parent_message_id: id
    });

};

export const addImageMessage = async (senderId, receiverId, message, link, image_height, image_width) => {
    const { id } =  await MessageDataAccess.insertParentMessage({
        type: 'image',
        sender_id: senderId,
        receiver_id: receiverId,
        message
    });

    return await MessageDataAccess.insertImageMessage({
        parent_message_id: id,
        link,
        image_height,
        image_width
    });
};

export const addVideoMessage = async (senderId, receiverId, message, video_length, video_source) => {
    const { id } =  await MessageDataAccess.insertParentMessage({
        type: 'video',
        sender_id: senderId,
        receiver_id: receiverId,
        message
    });

    return await MessageDataAccess.insertVideoMessage({
        parent_message_id: id,
        video_length,
        video_source
    })
};

export const findMessages = async () => {
    const messages = await MessageDataAccess.findMessages();
    return messages;
}
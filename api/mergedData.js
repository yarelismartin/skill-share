import { getMessages } from './messageData';
import { getSingleProfile } from './profileData';

const getAllMessages = async (senderId, receiverId) => {
  const receivedMessages = await getMessages(senderId, receiverId);
  const sentMessages = await getMessages(receiverId, senderId);
  const sender = await getSingleProfile(senderId);
  const receiver = await getSingleProfile(receiverId);
  const messages = await receivedMessages.concat(sentMessages);

  return { sender, receiver, messages };
};

export default getAllMessages;

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import getAllMessages from '../../../api/mergedData';
import MessageForm from '../../../components/forms/MessageForm';

export default function ShowMessages() {
  const router = useRouter();
  const { user } = useAuth();
  const { receiverUid, senderUid } = router.query;
  const [messageDetails, setMessageDetails] = useState({});
  const [newMessage, setNewMessage] = useState({});

  const getMessageDetails = () => {
    getAllMessages(senderUid, receiverUid).then(setMessageDetails);
    setNewMessage({ message: '', senderId: senderUid, receiverId: receiverUid });
  };

  useEffect(() => {
    getMessageDetails();
    console.warn(user.uid);
  }, []);

  return (
    <div>
      {messageDetails?.messages?.sort((a, b) => new Date(a.dateSent) - new Date(b.dateSent)).map((mes) => (
        <>
          <Card key={mes.firebaseKey}>
            <div>
              <h2>
                <img
                  style={{ width: '30px' }}
                  src={mes.senderId === senderUid ? messageDetails?.sender?.image : messageDetails?.receiver?.image}
                  alt={mes.senderId === senderUid ? messageDetails?.sender?.name : messageDetails?.receiver?.name}
                />
                {mes.message}
              </h2>
              <p>{mes.dateSent}</p>
            </div>
          </Card>
        </>
      ))}
      <br />
      <MessageForm messageObj={newMessage} onUpdate={getMessageDetails} />
    </div>
  );
}

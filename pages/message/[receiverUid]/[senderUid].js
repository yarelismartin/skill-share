/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import getAllMessages from '../../../api/mergedData';
import MessageForm from '../../../components/forms/MessageForm';

export default function ShowMessages() {
  const router = useRouter();
  const { receiverUid, senderUid } = router.query;
  const [messageDetails, setMessageDetails] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const sendMessageRef = useRef(null);

  const getMessageDetails = () => {
    getAllMessages(senderUid, receiverUid).then(setMessageDetails);
    setNewMessage({ message: '', senderId: senderUid, receiverId: receiverUid });
  };

  useEffect(() => {
    getMessageDetails();
  }, []);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      sendMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div style={{ marginTop: '30px', paddingBottom: '30px' }}>
      <div style={{
        display: 'flex', justifyContent: 'flex-end', marginTop: '30px', paddingBottom: '30px', marginRight: '40px',
      }}
      >
        <button aria-label="scroll-to-send" type="button" onClick={handleScroll} style={{ border: 'none', backgroundColor: 'inherit' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scroll-down">
            <circle cx="12" cy="12" r="8" transform="rotate(90 12 12)" stroke="black" strokeWidth="1.00088" strokeLinejoin="round" />
            <path d="M15.75 10.25C14.1879 11.8121 13.3121 12.6879 11.75 14.25L7.75 10.25" stroke="black" strokeWidth="1.00088" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="profile-left" style={{ display: 'flex', justifyContent: 'space-between' }}>

        <img src={messageDetails?.receiver?.image} alt="profile pic" className="profile-card__image" />
        <div className="profile-card__text-container">
          <h2 className="profile-card__name">{messageDetails?.receiver?.name.split(' ')[0]}</h2>
          <p className="profile-card__skill">{messageDetails?.receiver?.skill}</p>
          <p className="profile-card__location">{messageDetails?.receiver?.location}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
          {messageDetails?.messages?.sort((a, b) => new Date(a.dateSent) - new Date(b.dateSent)).map((mes) => (
            <div key={mes.firebaseKey} className="message-container">
              <div>
                <div className="image-text">
                  <p className={`${mes.senderId === senderUid ? 'send' : 'receive'} message-bubble`}>{mes.message}</p>
                </div>
                <p className={`${mes.senderId === senderUid ? 'send-date' : 'receive-date'}`} style={{ fontSize: '12px' }}>{formatDistanceToNow(new Date(mes.dateSent), { addSuffix: true })}</p>

              </div>
            </div>
          ))}
          <br />
          <MessageForm messageObj={newMessage} onUpdate={getMessageDetails} />
          <br ref={sendMessageRef} />
        </div>

      </div>
    </div>
  );
}

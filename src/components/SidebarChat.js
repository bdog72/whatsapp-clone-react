//
//

import React, { useEffect, useState } from 'react';
import db from '../firebase';

import '../styles/SidebarChat.scss';
import { Avatar, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const funnyAvatarImage = `https://avatars.dicebear.com/api/human/${seed}.svg`;

  const createChat = () => {
    const roomName = prompt('Please enter a name for chat room');

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={funnyAvatarImage} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      <Button variant='contained' color='primary'>
        <h2>Add New Chat</h2>
      </Button>
    </div>
  );
}

export default SidebarChat;

// let random = Math.floor(Math.random() * 10 + 1);

// const random = () => {
//   return Math.floor(Math.random() * 100 + 1);
// };

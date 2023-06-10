import React, { useEffect, useState } from 'react'
import ChatUserCard from '../ChatUserCard'
import { getUsers } from '@/redux/ApiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveContact } from '@/redux/contactSlice'

const ChatUserGrid = ({ chats, query, onlineUsers }) => {
  const { currentUser } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col overflow-y-auto h-[750px] scrollbar'>
      {chats?.filter(chat => (currentUser?._id === chat?.members[0]._id ? chat?.members[1]?.displayName : chat?.members[0]?.displayName).toLowerCase().includes(query.toLocaleLowerCase()))
      .map((chat, i) => (
        <div key={i} onClick={() => dispatch(setActiveContact(chat))}>
          <ChatUserCard user={chat} query={query} onlineUsers={onlineUsers} />
        </div>
      ))}

    </div>
  )
}

export default ChatUserGrid
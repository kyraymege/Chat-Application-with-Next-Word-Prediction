import React, { useEffect, useState } from 'react'
import ChatUserCard from '../ChatUserCard'
import { getUsers } from '@/redux/ApiCalls'
import { useDispatch } from 'react-redux'
import { setActiveContact } from '@/redux/contactSlice'

const ChatUserGrid = ({ chats, query, onlineUsers }) => {
  
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col overflow-y-auto h-[750px] scrollbar'>
      {chats?.map((chat, i) => (
        <div key={i} onClick={() => dispatch(setActiveContact(chat))}>
          <ChatUserCard user={chat} query={query} onlineUsers={onlineUsers} />
        </div>
      ))}

    </div>
  )
}

export default ChatUserGrid
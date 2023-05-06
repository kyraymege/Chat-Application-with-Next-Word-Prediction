import React, { useEffect, useState } from 'react'
import ChatUserCard from '../ChatUserCard'
import { getUsers } from '@/redux/ApiCalls'
import { useDispatch } from 'react-redux'
import { setActiveContact } from '@/redux/contactSlice'

const ChatUserGrid = ({chats,query}) => {
  const dispatch = useDispatch();
  console.log(chats)

  return (
    <div className='flex flex-col overflow-y-auto h-[750px] scrollbar'>
      {chats?.map((user, i) => (
        <div key={i} onClick={() => dispatch(setActiveContact(user))}>
          <ChatUserCard  user={user} query={query} />
        </div>
      ))}

    </div>
  )
}

export default ChatUserGrid
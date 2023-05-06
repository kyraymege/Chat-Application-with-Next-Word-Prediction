import React from 'react'
import ChatMessageCard from '../ChatMessageCard'
import { useSelector } from 'react-redux'

const ChatMessageContainer = ({ chatMessages, chatRef }) => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div ref={chatRef} className='flex flex-col  w-full overflow-y-auto xl:h-[750px] p-10 scrollbar'>
      <div className='flex-auto' />
      {chatMessages?.map((message, i) => (

        <ChatMessageCard key={i} data={message} sender={currentUser?._id == message?.sender?._id} />
      ))}
    </div>
  )
}

export default ChatMessageContainer
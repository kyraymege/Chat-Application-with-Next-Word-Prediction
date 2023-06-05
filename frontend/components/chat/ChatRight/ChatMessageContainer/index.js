import React, { useEffect, useState, useRef } from 'react'
import ChatMessageCard from '../ChatMessageCard'
import { useSelector } from 'react-redux'
import { fetchChatMessages } from '@/redux/ApiCalls';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'


const ChatMessageContainer = ({ chatMessages, chatRef, setMessages }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { activeContact } = useSelector((state) => state.activeContact);
  const [page, setPage] = useState(1)
  const user = currentUser?._id === activeContact?.members[0]._id ? activeContact?.members[1] : activeContact?.members[0];
  const scrollRef = useRef(null);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
    fetchChatMessages(activeContact._id, 1).then((res) => {
      console.log(res)
      setMessages(chatMessages => [res, ...chatMessages]);
    })
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages])


  return (
    <div ref={scrollRef} className='flex flex-col  w-full overflow-y-auto lg:h-[750px] h-[780px] lg:p-10 p-4 scrollbar'>
      <div className='flex-auto' />
      <button onClick={loadMore} className='w-1/6 group mx-auto h-10 rounded-xl text-white bg-fourth shadow-md shadow-gray-700 font-semibold text-sm flex items-center justify-center gap-x-2'>
        <span><MdKeyboardDoubleArrowUp className="group-hover:animate-bounce w-6 h-6 fill-yellow-400" /></span>
        Load More
        <span><MdKeyboardDoubleArrowUp className="group-hover:animate-bounce w-6 h-6 fill-yellow-400" /></span>
      </button>
      <div className='flex flex-col w-full ' ref={chatRef}>
        {chatMessages?.map((message, i) => (
          < ChatMessageCard key={i} data={message} sender={currentUser?._id == message?.sender?._id} isRead={message?.readBy?.includes(user._id)} />
        ))}
      </div>
    </div>
  )
}

export default ChatMessageContainer
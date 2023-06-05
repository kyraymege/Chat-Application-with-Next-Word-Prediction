import React, { useEffect, useState } from 'react'
import ChatUserGrid from '../ChatUserGrid'
import ChatHeader from '../ChatHeader'
import ChatSearch from '../ChatSearch'
import { useSelector } from 'react-redux'

const ChatLeftBar = ({ chats, setChats, onlineUsers }) => {
    
    const [query, setQuery] = useState('')
    const { currentUser } = useSelector((state) => state.auth);


    return (
        <div className='border-r border-gray-700 w-full' >
            <ChatHeader setChats={setChats} chats={chats} />
            <ChatSearch query={query} setQuery={setQuery} />
            {chats?.length <= 0 ?
                <div className='flex items-center justify-center w-full h-full'>
                    <p className='text-xl font-normal text-gray-400'>Start a chat to texting...</p>
                </div>
                :
                <ChatUserGrid onlineUsers={onlineUsers} query={query} chats={chats} />}
        </div>
    )
}

export default ChatLeftBar
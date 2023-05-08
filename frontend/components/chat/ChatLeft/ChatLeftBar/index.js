import React, { useEffect, useState } from 'react'
import ChatUserGrid from '../ChatUserGrid'
import ChatHeader from '../ChatHeader'
import ChatSearch from '../ChatSearch'
import { fetchChats } from '@/redux/ApiCalls'
import { useSelector } from 'react-redux'

const ChatLeftBar = () => {
    const [chats, setChats] = useState([])
    const [query, setQuery] = useState('')
    const { currentUser } = useSelector((state) => state.auth);
    useEffect(() => {
        fetchChats(currentUser?._id)
            .then((res) => {
                console.log(res?.data)
                setChats(res);
            });
    }, [currentUser])


    return (
        <div className='border-r border-gray-700 w-full' >
            <ChatHeader setChats={setChats} chats={chats} />
            <ChatSearch query={query} setQuery={setQuery} />
            {chats?.length <= 0 ?
                <div className='flex items-center justify-center w-full h-full'>
                    <p className='text-xl font-normal text-gray-400'>Start a chat to texting...</p>
                </div>
                :
                <ChatUserGrid query={query} chats={chats} />}
        </div>
    )
}

export default ChatLeftBar
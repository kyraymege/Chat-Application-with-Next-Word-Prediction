import React from 'react'
import ChatRightBar from '../ChatRight/ChatRightBar'
import ChatLeftBar from '../ChatLeft/ChatLeftBar'

const ChatContainer = () => {
    return (
        <div className='flex w-full mx-auto bg-secondary shadow-2xl shadow-gray-950'>
            <div className='w-1/3'>
                <ChatLeftBar />
            </div>
            <div className='w-full'>
                <ChatRightBar />
            </div>
        </div>
    )
}

export default ChatContainer
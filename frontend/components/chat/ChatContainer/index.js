import React, { useRef, useState, useEffect } from 'react'
import ChatRightBar from '../ChatRight/ChatRightBar'
import ChatLeftBar from '../ChatLeft/ChatLeftBar'
import { io } from "socket.io-client";
import { useSelector } from 'react-redux'

const ChatContainer = () => {
    const socket = useRef();
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const { currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("setup", currentUser)
        socket.current.on('connected', () => {
            setIsSocketConnected(true)
        }
        )
    }, [])


    return (
        <div className='flex w-full mx-auto bg-secondary shadow-2xl shadow-gray-950'>
            <div className='w-1/3'>
                <ChatLeftBar socket={socket} isSocketConnected={isSocketConnected} />
            </div>
            <div className='w-full'>
                <ChatRightBar socket={socket} isSocketConnected={isSocketConnected} />
            </div>
        </div>
    )
}

export default ChatContainer
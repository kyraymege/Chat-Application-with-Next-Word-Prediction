import ChatContainer from '@/components/chat/ChatContainer'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const chat = () => {
    return (
        <div className="min-h-screen w-full bg-primary flex flex-col justify-center">
            <ToastContainer />
            <div className="w-11/12 mx-auto">
                <ChatContainer />
            </div>
        </div>
    )
}

export default chat
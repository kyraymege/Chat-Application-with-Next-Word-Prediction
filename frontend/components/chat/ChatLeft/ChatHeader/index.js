import { PF } from '@/redux/ApiCalls';
import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import DotButton from './dotButton';
import ProfileModal from '@/components/modals/profileModal';

const ChatHeader = ({setChats,chats}) => {
    const { currentUser } = useSelector((state) => state.auth);
    const [showProfile, setShowProfile] = useState(false)

    return (
        <div>
            {showProfile &&
                <ProfileModal setShowProfile={setShowProfile} user={currentUser}/>}
            <div className='flex items-center justify-between w-full px-4 py-4 gap-x-6 bg-third rounded-tl-xl'>

                <img onClick={()=>setShowProfile(prev=>!prev)} className='object-contain rounded-full w-12 h-12 cursor-pointer' src={PF + currentUser?.profilePicture} alt="user" />

                <div className='cursor-pointer '>
                    <DotButton setChats={setChats} chats={chats}/>
                </div>

            </div>
        </div>
    )
}

export default ChatHeader
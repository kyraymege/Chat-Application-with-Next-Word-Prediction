import { PF } from '@/redux/ApiCalls'
import React from 'react'
import { useSelector } from 'react-redux';

const ChatUserCard = ({ user }) => {
    const { currentUser } = useSelector((state) => state.auth);
    return (
        <div className='flex items-center w-full px-4 gap-x-6 hover:bg-third cursor-pointer rounded-xl rounded-r-none border-b border-gray-700'>

            <img className='object-contain rounded-full w-12 h-12' src={PF + (currentUser?._id === user?.members[0]._id ? user?.members[1]?.profilePicture : user?.members[0]?.profilePicture)} alt="user" />

            <div className='flex flex-col py-1'>
                <p className='text-base font-medium'>{(currentUser?._id === user?.members[0]._id ? user?.members[1]?.displayName : user?.members[0]?.displayName)}</p>
                <p className='text-sm text-gray-300' >{user?.latestMessage?.content}</p>
            </div>

        </div>
    )
}

export default ChatUserCard
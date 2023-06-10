import { PF } from '@/redux/ApiCalls'
import React from 'react'
import { useSelector } from 'react-redux';

const ChatUserCard = ({ user, onlineUsers }) => {
    const { currentUser } = useSelector((state) => state.auth);
    const shortText = (text) => {
        if (!text) return '...';
        if (text.length <= 30) return text;
        return text.substr(0, 30) + '...';
    };

    const isOnline = (user, onlineUsers) => {
        var userId = user?.members[0]._id === currentUser?._id ? user?.members[1]._id : user?.members[0]._id;
        return onlineUsers.some((u) => u === userId);
    }

    return (
        <div className='flex justify-between items-center w-full px-4  hover:bg-third cursor-pointer rounded-xl rounded-r-none border-b border-gray-700 py-3'>
            <div className='flex gap-x-6'>
                <img className={isOnline(user, onlineUsers) ? 'object-contain rounded-full w-12 h-12 border-4 border-green-400' : 'object-contain rounded-full w-12 h-12 border-4 border-red-400'} src={PF + (currentUser?._id === user?.members[0]._id ? user?.members[1]?.profilePicture : user?.members[0]?.profilePicture)} alt="user" />

                <div className='flex flex-col py-1'>
                    <p className='text-base font-medium'>{(currentUser?._id === user?.members[0]._id ? user?.members[1]?.displayName : user?.members[0]?.displayName)}</p>
                    <p className='text-sm text-gray-300' >{shortText(user?.latestMessage?.content)}</p>
                </div>
            </div>
            {user?.chatName !== '' && user?.chatName !== undefined && user?.chatName !== 'sender' && user?.chatName !== '0' &&
                <span className='text-sm text-gray-300 px-3 py-2 bg-yellow-600 rounded-full'>{user?.chatName}</span>}

        </div>
    )
}

export default ChatUserCard
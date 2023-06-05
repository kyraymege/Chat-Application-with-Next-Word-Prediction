import { PF } from '@/redux/ApiCalls'
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import ProfileModal from '@/components/modals/profileModal'

const ChatMessageUser = ({ activeContact, isTyping }) => {
  const [showProfile, setShowProfile] = useState(false)
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div>
      {showProfile &&
        <ProfileModal setShowProfile={setShowProfile} user={(currentUser?._id === activeContact?.members[0]._id ? activeContact?.members[1] : activeContact?.members[0])} />}
      <div className='flex items-center justify-between w-full px-4 py-4 gap-x-6 bg-third rounded-tr-xl md:static fixed'>
        <div onClick={() => setShowProfile(prev => !prev)} className='flex items-center gap-x-6 cursor-pointer'>
          <img className='object-contain rounded-full w-12 h-12 cursor-pointer' src={PF + (currentUser?._id === activeContact?.members[0]._id ? activeContact?.members[1]?.profilePicture : activeContact?.members[0]?.profilePicture)} alt="user" />
          <div className='flex flex-col items-start justify-center'>
            <p className='text-lg font-semibold'>{(currentUser?._id === activeContact?.members[0]._id ? activeContact?.members[1]?.displayName : activeContact?.members[0]?.displayName)}</p>
            {isTyping &&
              <p className='text-base font-medium text-yellow-600'>{(currentUser?._id === activeContact?.members[0]._id ? activeContact?.members[1]?.displayName : activeContact?.members[0]?.displayName)} is typing...</p>
            }
          </div>
        </div>
        <div className='cursor-pointer '>
          <BsThreeDotsVertical className='fill-gray-400 w-5 h-5' />
        </div>
      </div>
    </div>
  )
}

export default ChatMessageUser
import { sendMessageToChat } from '@/redux/ApiCalls'
import React, { useState } from 'react'
import { BsFillSendFill, BsCardImage } from 'react-icons/bs'
import { MdEmojiEmotions } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ChatMessageSendBar = ({ sendMessage }) => {
    const [content, setContent] = useState("");


    return (
        <div>
            <div className='flex items-center justify-center w-full h-full px-10 py-3 gap-x-6 bg-third'>
                <div className='flex gap-x-4'>
                    <span className='bg-secondary hover:bg-fourth rounded-full p-3 cursor-pointer'>
                        <MdEmojiEmotions className='w-5 h-5 fill-gray-400' />
                    </span>
                    <span className='bg-secondary hover:bg-fourth rounded-full p-3 cursor-pointer'>
                        <BsCardImage className='w-5 h-5 fill-gray-400' />
                    </span>


                </div>
                <div className='w-full flex'>
                    <input
                        className=" text-sm leading-none text-gray-200 bg-secondary  rounded  w-full px-4 py-3 outline-none"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type something..."
                    />
                </div>
                <div className='flex items-center justify-center'>
                    {content ?
                        <button onClick={() => { sendMessage(content); setContent("") }} className='cursor-pointer bg-secondary hover:bg-fourth rounded-full p-3'>
                            <BsFillSendFill className='w-6 h-6 fill-yellow-400 rotate-45 hover:scale-125' />
                        </button>
                        :
                        <button disabled className='cursor-not-allowed bg-secondary rounded-full p-3'>
                            <BsFillSendFill className='w-6 h-6 fill-gray-400' />
                        </button>
                    }


                </div>

            </div>
        </div>
    )
}

export default ChatMessageSendBar
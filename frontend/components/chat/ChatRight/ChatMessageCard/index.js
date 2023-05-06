import moment from 'moment/moment'
import React from 'react'

const ChatMessageCard = ({ data, sender }) => {
    return (

        <div className='py-[2px]'>

            <div className={sender ? 'flex py-2 px-3 float-right w-fit bg-yellow-600 break-all rounded-xl rounded-br-none gap-x-3 max-w-2xl' : 'flex py-2 px-3 float-left w-fit bg-third break-all rounded-xl rounded-tl-none gap-x-3 max-w-2xl'}>
                <p>{data?.content}</p>
                <div className='flex justify-end items-end break-normal'>
                    <p className="text-xs text-end text-gray-300">{moment(data?.createdAt).fromNow()}</p>
                </div>
            </div>


        </div>
    )
}

export default ChatMessageCard
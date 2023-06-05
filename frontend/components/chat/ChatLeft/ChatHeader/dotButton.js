import React, { useState } from 'react'
import { BsThreeDotsVertical, BsFillPencilFill } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import { BiLogOutCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '@/redux/ApiCalls'
import { useRouter } from 'next/router'
import CreateNewChat from '@/components/modals/createNewChat'

const dotButton = ({ setChats, chats }) => {
    const [show, setshow] = useState(false);
    const [showCreateNewChat, setShowCreateNewChat] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col items-start sm:items-center sm:flex-row flex-wrap">
                {showCreateNewChat && <CreateNewChat setShow={setShowCreateNewChat} setChats={setChats} chats={chats} />}
                <div
                    className="flex items-center mb-4 lg:mb-0  relative cursor-pointer"
                    onClick={() => setshow(!show)}
                >
                    {show && (
                        <ul className="p-2 w-64 border-r border-yellow-600 bg-third absolute rounded z-40 right-0 shadow mt-16  top-0 text-gray-300">
                            <li onClick={() => setShowCreateNewChat(prev => !prev)} className="hover:bg-gray-600 p-2 rounded-l-2xl">
                                <div className="flex items-center gap-x-6">
                                    <img src='/newchat.png' className='object-contain w-6' />
                                    <p>Create new Chat</p>
                                </div>
                            </li>
                            <li className="hover:bg-gray-600 p-2 rounded-l-2xl">
                                <div className="flex items-center gap-x-6 ">
                                    <HiUserGroup className='fill-green-400' />
                                    <p>Create new Group</p>
                                </div>
                            </li>

                            <li onClick={() => logOut(dispatch, router)} className="hover:bg-gray-600 p-2 rounded-l-2xl">
                                <div className="flex items-center gap-x-6 ">
                                    <BiLogOutCircle className='fill-red-400' />
                                    <p>Logout</p>
                                </div>
                            </li>

                        </ul>
                    )}

                    <div onClick={() => setshow(!show)} className="relative inline-flex items-center p-3 opacity-25 hover:bg-gray-500 hover:animate-pulse hover:rounded-full">
                        <BsThreeDotsVertical className='fill-gray-400 w-5 h-5 ' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default dotButton
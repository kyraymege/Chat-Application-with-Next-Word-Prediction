import { PF, accessChat, fetchAllUsersBySearch } from "@/redux/ApiCalls";
import { setActiveContact } from "@/redux/contactSlice";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

const CreateNewChat = ({ setShow, setChats, chats }) => {
    const [search, setSearch] = useState("")
    const [chatsUsers, setChatsUsers] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const currentUser = useSelector(state => state.auth.currentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        if (search !== '') {
            const delayDebounceFn = setTimeout(() => {

                const res = fetchAllUsersBySearch(search);
                res.then((res) => {
                    setChatsUsers(res)
                    setIsSearch(true)
                }).catch((err) => {
                    console.log(err)
                })
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        } else {
            setChatsUsers([])
        }
    }, [search])

    const onAccessChat = (currentUserId, contactId) => {
        setIsSearch(false)
        accessChat(currentUserId, contactId).then((res) => {
            if (!chats.find((c) => c._id === res._id)) setChats([res, ...chats])
            dispatch(setActiveContact(res))
        }).catch((err) => {
            console.log(err)
        })

        setShow(false)

    }


    return (
        <div className="">
            <div className="py-12 bg-transparent bg-opacity-75 transition duration-150 ease-in-out z-40 absolute top-0 right-0 bottom-0 left-0 " id="modal">
                <div className="container bg-secondary mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-second rounded-xl border border-gray-900 shadow-2xl shadow-gray-950">
                        <div className="relative w-3/4 py-4 mx-auto">
                            <BiSearch className='absolute z-20 cursor-pointer top-[30px] left-4 fill-gray-400' />

                            <input
                                className="relative text-sm leading-none text-gray-300 bg-third  rounded lg:max-w-[452px] w-full px-10 py-3 outline-none"
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                        {isSearch && chatsUsers.length !== 0 &&
                            <div className="h-[600px] overflow-y-auto scrollbar">
                                {chatsUsers.map((chat, i) => (

                                    <div onClick={() => { onAccessChat(currentUser?._id, chat?._id) }} key={i} className='flex items-center w-full px-4 gap-x-6 py-2 hover:bg-third cursor-pointer rounded-xl '>

                                        <img className='object-contain rounded-full w-12 h-12' src={PF + chat?.profilePicture} alt="user" />

                                        <div className='flex flex-col '>
                                            <p className='text-base font-medium'>{chat?.displayName}</p>
                                            <p className='text-sm text-gray-300' >{chat?.username} ~ {chat?.email}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>}
                        {search === '' &&
                            <div className="flex justify-center">
                                <p className="text-yellow-300 text-lg font-medium">Search someone for chat</p>
                            </div>
                        }
                        {chatsUsers.length <= 0 && isSearch &&
                            <div className="flex items-start justify-center">
                                <p className="text-red-300 text-lg font-medium">No user found</p>
                            </div>}

                        <div onClick={() => setShow(prev => !prev)} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateNewChat;
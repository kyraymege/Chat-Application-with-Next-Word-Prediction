import React, { useRef, useState, useEffect } from 'react'
import ChatRightBar from '../ChatRight/ChatRightBar'
import ChatLeftBar from '../ChatLeft/ChatLeftBar'
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { fetchChatMessages, readMessage, sendMessageToChat, fetchChats } from '@/redux/ApiCalls'
import { removeActiveContact } from '@/redux/contactSlice';

const ChatContainer = () => {
    const socket = useRef();
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const { currentUser } = useSelector((state) => state.auth);
    const { activeContact } = useSelector((state) => state.activeContact);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const audioPlayer = useRef(null);
    const dispatch = useDispatch();

    const chatRef = useRef(null);


    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("setup", currentUser)
        socket.current.on('connected', () => {
            setIsSocketConnected(true)
        }
        )
        socket.current.on('getConnectedUsers', (res) => {
            // console.log(res)|
            setOnlineUsers(res)
        })
        dispatch(removeActiveContact())
    }, [])

    useEffect(() => {
        if (activeContact != null && isSocketConnected) {
            setMessages([]);
            fetchChatMessages(activeContact._id, 1, currentUser._id).then((res) => {
                var chat = [...chats]; // Create a new array using the spread operator
                const elementIndex = chat.findIndex((c) => c._id === activeContact._id);
                if (elementIndex !== -1) {
                    const element = chat[elementIndex];
                    const updatedElement = {
                        ...element, // Create a new object with existing properties from element
                        chatName: '0'
                    };
                    chat.splice(elementIndex, 1); // Remove the element from the array
                    chat.unshift(updatedElement); // Add the updated element to the beginning of the array
                    setChats(chat);
                }
                setMessages(res);
                // chatRef.current.lastElementChild.scrollIntoView();
            })
        }
    }, [activeContact])



    useEffect(() => {
        socket?.current?.on('message recieved', (newMessageRecieved) => {
            console.log("mesaj geldi")


            if (activeContact?._id === newMessageRecieved.chat._id) {
                var chat = [...chats]; // Create a new array using the spread operator
                const elementIndex = chat.findIndex((c) => c._id === newMessageRecieved.chat._id);
                if (elementIndex !== -1) {
                    const element = chat[elementIndex];
                    const updatedElement = {
                        ...element, // Create a new object with existing properties from element
                        latestMessage: newMessageRecieved, // Add the latestMessage property
                    };
                    chat.splice(elementIndex, 1); // Remove the element from the array
                    chat.unshift(updatedElement); // Add the updated element to the beginning of the array
                    setChats(chat);
                }
                readMessage(newMessageRecieved._id, currentUser._id);
                setMessages([...messages, newMessageRecieved]);
                chatRef.current.lastElementChild.scrollIntoView();
            } else {
                audioPlayer.current.play();
                var chat = [...chats]; // Create a new array using the spread operator
                const elementIndex = chat.findIndex((c) => c._id === newMessageRecieved.chat._id);
                if (elementIndex !== -1) {
                    const element = chat[elementIndex];
                    const updatedElement = {
                        ...element, // Create a new object with existing properties from element
                        latestMessage: newMessageRecieved, // Add the latestMessage property
                        chatName: parseInt(element.chatName) + 1
                    };
                    chat.splice(elementIndex, 1); // Remove the element from the array
                    chat.unshift(updatedElement); // Add the updated element to the beginning of the array
                    setChats(chat);
                }

            }
        })

        return () => {
            socket?.current?.off("message recieved");
        };
    })

    const sendMessage = async (content) => {
        try {
            sendMessageToChat(content, currentUser._id, activeContact._id).then((res) => {
                socket?.current?.emit("new message", res);
                // setMessages(messages => [...messages, res]);
                chatRef.current.lastElementChild.scrollIntoView();
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChats(currentUser?._id)
            .then((res) => {
                setChats(res)
                var chats = [];
                res?.map((chat) => {
                    chats.push(chat._id)
                })
                socket?.current?.emit('join chat', chats)
            });
    }, [currentUser])


    return (
        <div className='flex w-full mx-auto bg-secondary shadow-2xl shadow-gray-950'>
            <audio ref={audioPlayer} src="/notification-sound.mp3" />
            <div className='lg:w-1/3 md:w-1/2 md:block hidden'>
                <ChatLeftBar onlineUsers={onlineUsers} chats={chats} setChats={setChats} />
            </div>
            <div className='w-full'>
                <ChatRightBar onlineUsers={onlineUsers} socket={socket} isSocketConnected={isSocketConnected} chatRef={chatRef} sendMessage={sendMessage} messages={messages} setMessages={setMessages} />
            </div>
        </div>
    )
}

export default ChatContainer
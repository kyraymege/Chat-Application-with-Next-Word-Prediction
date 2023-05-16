import React, { useEffect, useState, useRef } from 'react'
import ChatMessageContainer from '../ChatMessageContainer'
import ChatMessageUser from '../ChatMessageHeader'
import { useSelector } from 'react-redux'
import { fetchChatMessages, sendMessageToChat } from '@/redux/ApiCalls'
import { BsFillSendFill, BsCardImage } from 'react-icons/bs'
import { MdEmojiEmotions } from 'react-icons/md'

const ChatRightBar = ({ socket, isSocketConnected }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { activeContact } = useSelector((state) => state.activeContact);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef();

  useEffect(() => {
    if (isSocketConnected) {
      socket?.current?.on('typing', () => {
        setIsTyping(true)
      })
      socket?.current?.on('stop typing', () => {
        setIsTyping(false)
      })
    }
  }, [])


  useEffect(() => {
    if (activeContact != null) {

      fetchChatMessages(activeContact._id).then((res) => {
        setMessages(res);

        socket?.current?.emit('join chat', activeContact._id)
        chatRef.current.lastElementChild.scrollIntoView();

      })

    }
  }, [activeContact])


  useEffect(() => {
    socket?.current?.on('message recieved', (newMessageRecieved) => {
      setMessages([...messages, newMessageRecieved]);
      chatRef.current.lastElementChild.scrollIntoView();
    })
  })

  const handleTyping = () => {
    if (!isSocketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit('typing', activeContact._id)
      setTimeout(() => {
        socket.current.emit('stop typing', activeContact._id)
        setTyping(false);
      }, 5000)
    }
  }

  const sendMessage = async () => {
    try {
      sendMessageToChat(content, currentUser._id, activeContact._id).then((res) => {
        // console.log(res)
        socket?.current?.emit("new message", res);
        setMessages([...messages, res]);
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full '>
      {activeContact != null ?
        <div className='w-full'>
          <ChatMessageUser isTyping={isTyping} activeContact={activeContact} />
          <ChatMessageContainer chatRef={chatRef} chatMessages={messages} />
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
              <form className='flex w-full gap-x-6' onSubmit={(e) => { e.preventDefault(); sendMessage(content); setContent("") }}>

                <input
                  className=" text-sm leading-none text-gray-200 bg-secondary  rounded  w-full px-4 py-3 outline-none"
                  type="text"
                  value={content}
                  onChange={(e) => { setContent(e.target.value); handleTyping() }}
                  placeholder="Type something..."
                />


                {content ?
                  <button type='submit' className='cursor-pointer bg-secondary hover:bg-fourth rounded-full p-3'>
                    <BsFillSendFill className='w-6 h-6 fill-yellow-400 rotate-45 hover:scale-125' />
                  </button>
                  :
                  <button disabled className='cursor-not-allowed bg-secondary rounded-full p-3'>
                    <BsFillSendFill className='w-6 h-6 fill-gray-400' />
                  </button>
                }

              </form>

            </div>
          </div>
        </div>
        :
        <div className='w-full h-[850px]'>
          <div className='flex flex-col items-center justify-center w-full h-full border-b-8 border-yellow-600'>
            <img className='object-contain w-1/2 h-1/2' src='/chat.svg' alt="chat" />
            <p className='text-2xl font-semibold text-gray-400'>Select a chat to start messaging</p>
          </div>

        </div>
      }
    </div>
  )
}

export default ChatRightBar
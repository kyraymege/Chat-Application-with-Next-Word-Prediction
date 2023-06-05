import React, { useEffect, useState, useRef } from 'react'
import ChatMessageContainer from '../ChatMessageContainer'
import ChatMessageUser from '../ChatMessageHeader'
import { useSelector } from 'react-redux'
import { BsFillSendFill, BsCardImage } from 'react-icons/bs'
import { MdEmojiEmotions, MdKeyboardTab } from 'react-icons/md'
import Picker from 'emoji-picker-react';
import { guessWord } from '@/redux/ApiCalls'


const ChatRightBar = ({ socket, isSocketConnected, chatRef, sendMessage, messages, setMessages, onlineUsers }) => {
  const { activeContact } = useSelector((state) => state.activeContact);
  const { currentUser } = useSelector((state) => state.auth);
  const [guessedWord, setGuessedWord] = useState(null)
  const [content, setContent] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  useEffect(() => {
    setGuessedWord(null)
    if (content === '') setGuessedWord(null)
    if (content !== '') {
      const delayDebounceFn = setTimeout(() => {

        const res = guessWord(content, currentUser._id);
        res.then((res) => {
          console.log(res)
          setGuessedWord(res)
        }).catch((err) => {
          console.log(err)
        })
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } else {
      setGuessedWord(null)
    }
  }, [content])

  // useEffect(() => {
  //   if (isSocketConnected) {
  //     socket?.current?.on('typing', () => {
  //       setIsTyping(true)
  //     })
  //     socket?.current?.on('stop typing', () => {
  //       setIsTyping(false)
  //     })
  //   }
  // }, [])

  // const handleTyping = () => {
  //   if (!isSocketConnected) return;

  //   if (!typing) {
  //     setTyping(true);
  //     socket.current.emit('typing', activeContact._id)
  //     setTimeout(() => {
  //       socket.current.emit('stop typing', activeContact._id)
  //       setTyping(false);
  //     }, 5000)
  //   }
  // }

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (guessedWord) {
        setContent((prevContent) => prevContent + ' ' + guessedWord);
        setGuessedWord('');
      }
    }
  };

  return (
    <div className='w-full '>
      {activeContact != null ?
        <div className='w-full'>
          <ChatMessageUser isTyping={isTyping} activeContact={activeContact} />
          <ChatMessageContainer chatRef={chatRef} chatMessages={messages} setMessages={setMessages} />
          <div>
            <div className='flex items-center justify-center w-full h-full lg:px-10 lg:py-3 px-6 py-2 gap-x-6 bg-third'>

              <div className='flex gap-x-4'>
                <span className='bg-secondary hover:bg-fourth rounded-full p-3 cursor-pointer relative'>
                  <MdEmojiEmotions onClick={() => setShowEmojiPicker((prev) => !prev)} className='w-5 h-5 fill-gray-400' />
                  {showEmojiPicker &&
                    <span className="absolute -top-[475px]">
                      <Picker theme='dark' onEmojiClick={(emoji) => { console.log(emoji.unified); setContent(content + emoji.emoji) }} />
                    </span>}
                </span>
                {!content && <span className='bg-secondary hover:bg-fourth rounded-full p-3 cursor-pointer'>
                  <BsCardImage className='w-5 h-5 fill-gray-400' />
                </span>}
              </div>

              <form className='flex w-full gap-x-6' onSubmit={(e) => { e.preventDefault(); sendMessage(content); setContent(""); }}>
                <div className='w-full relative'>
                  <input
                    // className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10"
                    className=" text-base leading-none caret-slate-100 text-gray-200 flex-grow bg-secondary absolute rounded  w-full px-4 py-3 outline-none after:content-['dsadasd']"
                    type="text"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type something..."
                  />
                  {guessedWord &&
                    <div className="absolute inset-y-0 left-4 text-base flex items-center pr-2 text-white">
                      <p className='opacity-0 text-base'>{content}</p>
                      <p>&nbsp;&nbsp;</p>
                      <p className='opacity-70'>{guessedWord}</p>
                      <span className='px-[4px] py-[2px] border border-gray-500 ml-2 flex gap-x-2  items-center justify-center'>
                        <p className='text-gray-500'>press</p>
                        <MdKeyboardTab className='w-5 h-5 fill-gray-500' />
                      </span>
                    </div>}
                </div>
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
            <img className='object-contain w-1/2 h-1/2' src='/landing.png' alt="chat" />
            <p className='text-2xl font-semibold text-gray-400'>Select a chat to start messaging</p>
          </div>

        </div>
      }
    </div>
  )
}

export default ChatRightBar
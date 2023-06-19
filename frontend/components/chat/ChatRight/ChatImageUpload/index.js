import React from 'react'
import { useState } from 'react';
import { ImCross } from 'react-icons/im'
import { FaPlus } from 'react-icons/fa'
import { BsFillSendFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { sendMessageToChat, uploadChatImage } from '@/redux/ApiCalls';
import { toast } from 'react-toastify';

const ChatImageUpload = ({ file, setFile, socket }) => {
    const { currentUser } = useSelector((state) => state.auth);
    const { activeContact } = useSelector((state) => state.activeContact);
    const fileArray = [...file];
    const [isActive, setIsActive] = useState(file[0])

    const handleSubmit = async (e) => {
        if (file) {
            e.preventDefault();
            const formData = new FormData();
            for (let i = 0; i < file.length; i++) {
                formData.append("files", file[i]);
            }
            try {
                const response = await uploadChatImage(formData);
                (response.fileNames).forEach((filename) => {
                    console.log(filename)
                    sendMessageToChat(filename, currentUser._id, activeContact._id, "image").then((res) => {
                        socket?.current?.emit("new message", res);
                    });
                });
                if (response.message === "Files have been uploaded!") {
                    toast.success("Files have been uploaded!");
                    setFile(null);
                } else {
                    console.log("Upload failed");
                    toast.error("Upload failed");
                }
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    };

    const handleDeletePhoto = (fileItem) => {
        const newFileArray = fileArray.filter((item) => item !== fileItem)
        setFile(newFileArray);
        setIsActive(file[0])
    }

    return (
        <div className='p-4'>
            <span onClick={() => setFile(null)} className='p-6 cursor-pointer'>
                <ImCross className='text-white cursor-pointer' />
            </span>
            <div className='flex items-center justify-center py-10'>
                <img src={window.URL.createObjectURL(isActive)} alt="avatar" className="w-[680px] h-[460px] transition-all p-10" />
            </div>
            <div className='flex items-center justify-center gap-x-6'>
                {Array.isArray(fileArray) &&
                    fileArray.map((fileItem, index) => (
                        <div  key={index} className={isActive === fileItem ? 'border rounded-xl border-yellow-400 cursor-pointer flex' : ' border rounded-xl border-yellow-600 cursor-pointer flex'}>
                            <img onClick={() => { setIsActive(fileItem) }} src={window.URL.createObjectURL(fileItem)} alt="avatar" className="w-32 h-32 transition-all p-3" />
                            <ImCross onClick={() => handleDeletePhoto(fileItem)} className='text-white cursor-pointer ' />
                        </div>
                    ))}
                <button onClick={handleSubmit} className='cursor-pointer bg-third hover:bg-third rounded-full p-3'>
                    <BsFillSendFill className='w-10 h-10 fill-yellow-400 rotate-45 hover:scale-125' />
                </button>
            </div>
        </div>
    )
}

export default ChatImageUpload
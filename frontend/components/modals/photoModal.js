import { PF, imageDownload } from '@/redux/ApiCalls'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

const photoModal = ({ data, setShowPhoto }) => {

    const handleDownload = () => {
        imageDownload(data?.content)
        .then(response => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.download = data?.content;
            fileLink.click();
            
        })
            .catch(error => {
                console.log(error);
                
            });
    };

return (
    <div className="">
        <div className="py-12 bg-third bg-opacity-75 transition duration-150 ease-in-out z-40 absolute top-0 right-0 bottom-0 left-0 " id="modal">
            <div className="container bg-secondary mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-second rounded-xl border border-gray-900 shadow-2xl shadow-gray-950">
                    <div onClick={handleDownload} className='flex flex-col items-center justify-center gap-y-10 py-6 group cursor-pointer'>
                        <img crossOrigin="anonymous" id="current-image" src={PF + data?.content} alt="photo" className="w-11/12 h-11/12 2 mx-auto object-cover group-hover:blur-sm" />
                        <p className="text-xs text-end text-gray-300">{moment(data?.createdAt).fromNow()}</p>
                        <AiOutlineDownload className="group-hover:absolute w-10 h-10 mb-8 text-white hidden group-hover:block transition-all" />
                    </div>

                    <div onClick={() => setShowPhoto(prev => !prev)} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
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
)
}

export default photoModal


import { PF } from '@/redux/ApiCalls'
import React from 'react'

const profileModal = ({ user, setShowProfile }) => {
    return (
        <div className="">
            <div className="py-12 bg-transparent bg-opacity-75 transition duration-150 ease-in-out z-40 absolute top-0 right-0 bottom-0 left-0 " id="modal">
                <div className="container bg-secondary mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-second rounded-xl border border-gray-900 shadow-2xl shadow-gray-950">
                        <div className='flex flex-col items-center justify-center gap-y-10 py-6'>
                            <img src={PF + user?.profilePicture} alt="user" className="w-32 h-32 rounded-full mx-auto object-cover" />
                            <h1 className='text-xl font-bold'>{user?.displayName}</h1>
                            <p className='text-lg font-medium'>{user?.email} ~ {user?.username}</p>
                        </div>

                        <div onClick={() => setShowProfile(prev => !prev)} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
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

export default profileModal


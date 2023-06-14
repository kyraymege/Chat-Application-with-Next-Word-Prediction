import ChatContainer from '@/components/chat/ChatContainer'
import Meta from '@/components/meta/meta';
import { logOut } from '@/redux/ApiCalls';
import { hasCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const chat = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        // const hasAccess = hasCookie('access_token');
        // const token = getCookie('access_token');
        // console.log(hasAccess, token)
        // // if (!hasAccess) { 
        // //     logOut(dispatch, router)
        // // }
    }, [])

    return (
        <div className="min-h-screen w-full bg-primary flex flex-col justify-center">
            <Meta title="ChatApp" />
            <ToastContainer />
            <div className="lg:w-11/12 md:w-11/12 mx-auto">
                <ChatContainer />
            </div>
        </div>
    )
}

export default chat
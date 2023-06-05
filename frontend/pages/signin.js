import SignInComponent from '@/components/auth/signin'
import Meta from '@/components/meta/meta';
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signin = () => {
    return (
        <div>
            <Meta title="ChatApp | Sign In" />
            <ToastContainer />
            <SignInComponent />
        </div>
    )
}

export default signin
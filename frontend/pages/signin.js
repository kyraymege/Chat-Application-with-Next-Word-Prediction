import SignInComponent from '@/components/auth/signin'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signin = () => {
    return (
        <div>
            <ToastContainer />
            <SignInComponent />
        </div>
    )
}

export default signin
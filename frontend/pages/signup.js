import SignUpComponent from '@/components/auth/signup'
import Meta from '@/components/meta/meta';
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = () => {
  return (
    <div>
      <Meta title="ChatApp | Sign Up" />
      <ToastContainer />
      <SignUpComponent />
    </div>
  )
}

export default signup
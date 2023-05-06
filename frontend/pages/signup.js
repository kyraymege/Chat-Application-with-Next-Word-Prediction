import SignUpComponent from '@/components/auth/signup'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = () => {
  return (
    <div>
      <ToastContainer />
        <SignUpComponent/>
    </div>
  )
}

export default signup
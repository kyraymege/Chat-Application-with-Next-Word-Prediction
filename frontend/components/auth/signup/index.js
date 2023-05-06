import React, { useEffect, useState } from 'react'
import { Nabla } from 'next/font/google'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { uploadImage, register } from '@/redux/ApiCalls'
import { useRouter } from 'next/router'

const nabla = Nabla({ subsets: ['latin'] })

const SignUpComponent = () => {
    const [showPassowrd, setshowPassowrd] = useState(false)
    const hiddenFileInput = React.useRef(null);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        console.log(file)
    }, [file])



    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (username === "" || password === "" || name === "" || email === "") {
            toast.warn("You must fill all sections!")
        } else {
            try {
                if (file) {
                    const user = {
                        displayName: name,
                        username,
                        email,
                        password,
                        profilePicture: username + "." + file.type.slice(6)
                    }
                    register(user, router)
                    const formData = new FormData();
                    formData.append("file", file);
                    uploadImage(formData, username + "." + file.type.slice(6));
                } else {
                    const user = {
                        displayName: name,
                        username,
                        email,
                        password,
                        profilePicture: "defaultUserImage.png"
                    }
                    register(user, router)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className="h-screen bg-gradient-to-tl from-yellow-400 to-yellow-900 w-full py-8 px-4">
            <div className="flex flex-col items-center justify-center">
                <div className={nabla.className}>
                    <h1 className='text-7xl'>Chat App</h1>
                </div>

                <div className="bg-secondary shadow rounded lg:w-1/4  md:w-1/3 w-full p-10 mt-16 ">
                    <div className="flex items-center justify-center bg-third rounded-full mx-auto w-fit p-3 my-4 cursor-pointer group">
                        <input accept="image/*" id="dropzone-file" type="file" className="hidden" ref={hiddenFileInput} onChange={(e) => setFile(e.target.files[0])} />
                        {file ?
                            <img onClick={handleClick} src={window.URL.createObjectURL(file)} alt="avatar" className="w-44 h-44 rounded-full group-hover:blur-sm transition-all" />
                            :
                            <img onClick={handleClick} src="/user.png" alt="avatar" className="w-44 h-44 rounded-full group-hover:blur-sm transition-all" />}

                        <AiOutlinePlus onClick={handleClick} className="group-hover:absolute w-8 h-8 mb-8 text-third hidden group-hover:block transition-all" />
                        <p onClick={handleClick} className='group-hover:absolute hidden group-hover:block transition-all mt-16 w-20 text-center text-gray-950 font-medium'>CHANGE PROFILE PHOTO</p>
                    </div>


                    <div>
                        <label className="text-sm font-medium leading-none text-gray-200">Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} aria-label="enter name" role="input" type="text" className="bg-third rounded outline-none text-xs font-medium leading-none text-gray-200 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none text-gray-200">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} value={username} aria-label="enter username" role="input" type="text" className="bg-third rounded outline-none text-xs font-medium leading-none text-gray-200 py-3 w-full pl-3 mt-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium leading-none text-gray-200">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} aria-label="enter email adress" role="input" type="email" className="bg-third rounded outline-none text-xs font-medium leading-none text-gray-200 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div className=" w-full">
                        <label className="text-sm font-medium leading-none text-gray-200">Password</label>
                        <div className="relative flex items-center justify-center">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} aria-label="enter Password" role="input" type={showPassowrd ? "text" : "password"} className="bg-third rounded outline-none text-xs font-medium leading-none text-gray-200 py-3 w-full pl-3 mt-2" />
                            <div onClick={() => setshowPassowrd((prev) => !prev)} className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                        fill="#71717A"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 items-center justify-center flex cursor-pointer">
                        <div onClick={handleRegister} className="relative px-10 py-2 font-medium text-white group">
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-yellow-500 group-hover:bg-yellow-700 group-hover:skew-x-12"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-yellow-600 group-hover:bg-yellow-500 group-hover:-skew-x-12"></span>

                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-yellow-600 -rotate-12"></span>
                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-yellow-400 -rotate-12"></span>
                            <span className="relative">Sign Up</span>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  " />
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className="text-sm mt-4 font-medium leading-none text-gray-400">
                            Do you have an account?{" "}
                            <Link href="/signin">
                                <span tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-200 cursor-pointer">
                                    {" "}
                                    Sign in here
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpComponent
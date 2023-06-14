import { useRouter } from 'next/router';
import React from 'react'

const NotFound = () => {
    const router = useRouter();
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img className="w-full" src="/404.svg" alt="" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-white text-center">Looks like you've found the doorway to the great nothing</h1>
                <p className="py-4 text-base text-gray-300 font-semibold">The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.</p>
                <p className="py-2 text-base text-gray-300 font-semibold">Sorry about that! Please visit our homepage to get where you need to go.</p>
                <button className="font-semibold w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-yellow-600 text-white hover:bg-yellow-700 hover:outline-none focus:ring-yellow-600 focus:ring-2 focus:ring-opacity-50">Go back to Homepage</button>
            </div>
        </div>
    )
}

export default NotFound
import React from 'react'
import { BiSearch } from 'react-icons/bi'
const ChatSearch = ({query,setQuery}) => {
    return (
        <div className="relative w-3/4 py-4 mx-auto">
            <BiSearch className='absolute z-20 cursor-pointer top-[26px] left-4 fill-gray-400' />

            <input
                className="relative text-sm leading-none text-gray-200 bg-third  rounded lg:max-w-[452px] w-full px-10 py-2 outline-none"
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    )
}

export default ChatSearch
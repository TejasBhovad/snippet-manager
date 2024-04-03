import React from 'react';
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";

const Usercard = () => {
  return (
    <div>
      <div className="flex flex-row border-2 border-black bg-indigo-900 p-2 rounded-md w-52 h-16">
        <CgProfile size={46} color='white' className='pr-1' />
        <div className='gap-2 flex flex-row'>
        <div className="flex flex-col gap-1 pl-2">
          <span className="text-gray-500 text-sm text-white">Username</span> {/* Increased username size */}
          <span className='text-gray-500 text-xs'>Status</span> 
        </div>
        <div className="flex-grow"></div> {/* Flex grow to push settings icon to the right */}
        <IoIosSettings size={46} color='white' className=' pr-2 pl-2' /> {/* Move the setting icon to the extreme right */}
        </div>
      </div>
    </div>
  )
}

export default Usercard;

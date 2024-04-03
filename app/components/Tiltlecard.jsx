import React from 'react'
import { HiOutlineLink } from "react-icons/hi";
const Tiltlecard = () => {
  return (
    <div className='p-4'>
        <div className="flex flex-row gap-12 ">
            <span className='text-white text-3xl'>
                Project Title 
            </span>
            <div className=" pl-96  flex flex-row gap-2">
                <button  className='text-white bg-blue-700 rounded-md p-2'>Public</button>
                <button className='bg-blue-800 rounded-md p-2'><HiOutlineLink size={25} color='white'/> </button>
            </div>
        </div>
    </div>
  )
}

export default Tiltlecard
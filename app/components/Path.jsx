import React from 'react'
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Path = () => {
  return (
    <div className='flex flex-row gap-3 '>
        <div className="gap-2 flex flex-row p-2">
        <FaRegArrowAltCircleLeft size={25} />
        <FaRegArrowAltCircleRight size={25} />
        </div>
        <div className="gap-4 p-1 flex flex-row rounded-md bg-blue-400">
            <span className='text-blue-700'>
                file
            </span>
            <span className='text-blue-700'>
                path
            </span>
            <span className='text-blue-700'>
                md
            </span>

        </div>
    </div>
  )
}

export default Path
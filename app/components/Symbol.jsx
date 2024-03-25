import React from 'react'
import { FaFileCirclePlus } from "react-icons/fa6";
import { HiFolderPlus } from "react-icons/hi2";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegMinusSquare } from "react-icons/fa";
const Symbol = () => {
  return (
    <div className='flex gap-4 flex-row pl-3'>
      <button>
      <div className="p-2 border-2 border-black w-12 rounded-xl bg-indigo-900">
      <FaFileCirclePlus size={30} color='white'/>
      </div>
      </button>
      <button>
      <div className="p-2 border-2 border-black w-12 rounded-xl bg-indigo-900">
      < HiFolderPlus size={30} color='white'/>
      </div>
      </button>
      <button>
      <div className="p-2 border-2 border-black w-12 rounded-xl bg-indigo-900">
      < IoKeyOutline size={30} color='white'/>
      </div>
      </button>
      <button>
      <div className="p-2 border-2 border-black w-12 rounded-xl bg-indigo-900">
      < FaRegMinusSquare size={30} color='white'/>
      </div>
      </button>
      
    </div>
  )
}

export default Symbol
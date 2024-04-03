import React from 'react';
import { LuFolderLock } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";

const Snippetcard = () => {
  return (
    <div className="w-full h-full">
      <div className="gap-2">
        <span className=''>SNIPPETS</span>
        
        <div className='flex flex-col gap-2'>

          {/* First Column */}
          <div className="bg-indigo-900 flex flex-row p-2 w-52 rounded-md">
            <IoIosArrowForward size={20} color='white' className='pr-1'/>
            <LuFolderLock size={20} color='white' className=''/>
            <div className="text-white pl-2">API_KEYS</div>
          </div>

          {/* Second Column */}
          <div className="bg-indigo-900 flex flex-row p-2 w-52 rounded-md">
            <IoIosArrowForward size={20} color='white' className='pr-1'/>
            <LuFolderLock size={20} color='white' className=''/>
            <div className="text-white pl-2">HIDDEN_FILES</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Snippetcard;

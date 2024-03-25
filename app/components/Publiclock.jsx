import React from 'react'

const Publiclock = () => {
  return (
   
        <div className="w-full h-full ">
            <div className="flex gap-4 flex-row ">
                <button><span className="bg-indigo-900  rounded-2xl border-black border-1 w-1/2 p-2 text-white px-10" > Public </span> </button>
               <button><span className=" bg-indigo-900  rounded-2xl border-black border-1 w-1/2 p-2 text-white px-10" > Locked </span> </button>
            </div>

        </div>
    
  )
}

export default Publiclock
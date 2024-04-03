import React from 'react'
import Searchbar from '../components/Searchbar'
import Symbol from '../components/Symbol'
import Publiclock from '../components/Publiclock'
import Snippetcard from '../components/Snippetcard'
import Usercard from '../components/Usercard'
import Tiltlecard from '../components/Tiltlecard'
import Path from '../components/path'
const page = () => {
  return (
    <div className='flex flex-col justify-items-center  w-full h-full bg-gray-600'>
      <div className='flex flex-row gap-10'>
             <div className='rounded-lg pb-4 p-2'>
                 <Searchbar />
              </div>
              <div className="flex gap-1 flex-col">
                   <div className="">
                      <Tiltlecard />
                    </div>
                    <div className="pl-4">
                      <Path/>                      
                    </div>
              </div>
      </div>

      <div className='p-2 pb-4'>
         <Symbol />
      </div>
            
           
      
    <div className='gap-4  p-2 pb-4'>
      <Publiclock />
    </div>

    <div className="p-2 h-full ">
      <Snippetcard />
    </div>

    <div className="p-2  ">
      <Usercard />
    </div>


    </div>
  )
}

export default page
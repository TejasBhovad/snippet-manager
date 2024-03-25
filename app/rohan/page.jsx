import React from 'react'
import Searchbar from '../components/Searchbar'
import Symbol from '../components/Symbol'
import Publiclock from '../components/Publiclock'
const page = () => {
  return (
    <div className='flex flex-col justify-items-center  w-full h-full '>
      <div className='rounded-lg pb-4 p-2'>
      <Searchbar />
      </div>
      <div className='p-2 pb-4'>
      <Symbol />
      </div>
    <div className='gap-4 w-full h-full p-2'>
      <Publiclock />
    </div>

    </div>
  )
}

export default page
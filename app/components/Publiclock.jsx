'use client';
import React from 'react'
import { useState } from 'react'
const Publiclock = () => {
  const [filter, setFilter] = useState('public')
  return (
        <div className="">
            <div className="flex gap-4 flex-row">
                <button onClick={() => setFilter('public')}><span className={`bg-indigo-900 rounded-2xl border-black border-1 w-1/2 p-2 text-white px-10 ${filter === 'public' ? 'bg-indigo-500' : 'bg-indigo-900 opacity-50'}`}>Public</span></button>
                <button onClick={() => setFilter('locked')}><span className={`bg-indigo-900 rounded-2xl border-black border-1 w-1/2 p-2 text-white px-10 ${filter === 'locked' ? 'bg-indigo-500' : 'bg-indigo-900 opacity-50'}`}>Locked</span></button>
            </div>
        </div>
  )
}

export default Publiclock
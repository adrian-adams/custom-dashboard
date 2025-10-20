import React from 'react'
import { Search } from 'lucide-react';

export const SearchBar = ({search, setSearch, launchSearch}) => {

  return (
    <>
      <div className='flex items-center justify-center text-white bg-gray-500 rounded-2xl w-full md:w-5/12 overflow-hidden'>
          <button type='button' className='px-2 py-4 h-full hover:bg-green-800 transition duration-200 ease-in-out  cursor-pointer outline-0 border-0'>
              <Search onClick={launchSearch} />
          </button>
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tag, eg CSS..." 
            className='w-full h-[50px] bg-gray-500 p-4 border-0 outline-0 rounded-2xl' 
          />
      </div>
    </>
  )
}

export default SearchBar

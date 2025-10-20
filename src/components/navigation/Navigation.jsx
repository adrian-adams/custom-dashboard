import React, {useState} from 'react'
import NavList from "@/components/navigation/NavList"
import SearchBar from "@/components/navigation/SearchBar"

export const Navigation = ({search, setSearch, userRole}) => {
  
  return (
    <>
        <nav className='flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-b-green-800 p-5 sticky top-0 backdrop-blur z-40'>
            <NavList userRole={userRole} />
            <SearchBar search={search} setSearch={setSearch} />
        </nav>
    </>
  )
}

export default Navigation

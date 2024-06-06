import React from 'react'
import HeroHome from './pages/heroHome/HeroHome'
import { Outlet } from 'react-router-dom'
// import ManagerVideo from './pages/ManagerVideo'

export default function PageBackoffice() {
  return (
    <div className='h-fit bg-[#aeadac] dark:bg-normalBlack flex flex-col items-center pt-32'>
        <h1 className='text-5xl font-Garamond font-semibold'>Backoffice</h1>
        {/* <HeroHome /> */}
        <Outlet />
    </div>
  )
}

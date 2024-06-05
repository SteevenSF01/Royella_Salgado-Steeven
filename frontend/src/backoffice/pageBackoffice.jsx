import React from 'react'
import ManagerVideo from './pages/ManagerVideo'

export default function PageBackoffice() {
  return (
    <div className='h-screen bg-[#aeadac] dark:bg-normalBlack flex flex-col items-center w-full pt-32'>
        <h1 className='text-3xl font-bold'>Backoffice</h1>
        <ManagerVideo />
    </div>
  )
}

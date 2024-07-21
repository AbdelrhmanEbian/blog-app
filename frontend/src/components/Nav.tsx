import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Toggle from './Toggle'
import Auth from './Auth'

const Nav = () => {
  return (
    <div className=' h-[80px] mb-10 duration-500 flex justify-between items-center'>
      <div className=' hidden md:flex gap-2 flex-1'>
        <Image src={'/facebook.png'} alt='facebook'  width={24} height={24}/>
        <Image src={'/youtube.png'} alt='youtube'  width={24} height={24}/>
        <Image src={'/tiktok.png'} alt='tiktok'  width={24} height={24}/>
        <Image src={'/instagram.png'} alt='instagram'  width={24} height={24}/>
      </div>
      <div className=' md:text-center text-left flex-1 max-md:text-2xl text-4xl font-bold'>Blog App</div>
      <div className='  justify-end items-center flex lg:gap-1 xl:gap-5 gap-3 flex-1 text-xl'>
        <Toggle/>
        <Link className='hidden lg:block hover:bg-secondary p-2 rounded-md ' href={'/'}>Home</Link>
        <Auth/>
      </div>
      
    </div>
  )
}

export default Nav
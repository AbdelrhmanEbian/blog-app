import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import Loading from './Loading';
import { getPostOnly } from '../schema/query';

const Featured = () => {
  
  const { data, loading, error } = useQuery(getPostOnly,{
    variables:{
        popular:true
    }
  })
  if (loading) {
    return <Loading/>
  }
  return (
    <div className='  mt-[20px] '>
      <h1 className=' text-4xl md:text-7xl'><b>Hey, Here !</b> Disocver my stories and creative ideas.</h1>
      {data && (
      <div className='  text-[60px] min-h-[300px]  md:flex  my-[70px] items-center gap-10'>
        <div className=' flex-1 min-h-[300px] max-xl:flex-[2]  relative '>
        <Image src={data.getPost.img ? data.getPost.img : "/p1.jpeg"} alt='' fill className=' rounded-xl  object-fill' />
        </div>
        <div className=' gap-5 max-w-full flex max-md:mt-[20px] md:min-h-[300px] justify-evenly flex-col flex-1'>
          <div className=' py-1 '>
          <h1 className=' md:text-[30px] break-words text-3xl '>{data.getPost.title}</h1>
          </div>
          <p className='  text-xl break-words  md:text-[20px] font-light text-accent '>{data.getPost.desc}</p>
          <button className=' w-max btn'>
            <Link href={`blog/${data.getPost.id}`}>
            Read More
            </Link>
            </button>
        </div>
      </div>)}
    </div>
  )
}

export default Featured
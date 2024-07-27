import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { post } from '../schema/type';
const Featured = ({ post }: { post: post | null }) => {
  return (
    <div>
      <h1 className='text-3xl md:text-5xl font-[500]'>
        <span className='font-bold'> Hey, There! </span> Discover new stories and creative ideas.
      </h1>
      <div className='text-[60px] min-h-[300px] md:flex my-[70px] items-center gap-10'>
        <div className='flex-1 min-h-[300px] max-xl:flex-[2] relative'>
          <Image
            sizes="(max-width: 600px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
            loading='lazy'
            src={post?.img || "/p1.jpeg"}
            alt={post?.title ? post?.title : "Default post image"}
            fill
            className='rounded-xl object-fill'
          />
        </div>
        <div className='gap-5 max-w-full flex max-md:mt-[20px] md:min-h-[300px] justify-evenly flex-col flex-1'>
          <div className='py-1'>
            <h2 className='md:text-[30px] break-words text-3xl font-semibold'>
              {post?.title}
            </h2>
          </div>
          <p className='text-xl break-words md:text-[20px] font-light text-accent'>
            {post?.desc}
          </p>
          <button className='w-max btn'>
            <Link className=' btn-neutral' aria-label={"our popular post is about" + post?.title} href={`blog/${post?.id}`}>Read More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Featured;
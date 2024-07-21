import Image from "next/image";
import Link from "next/link";
import React from "react";
import {post} from '../schema/type' 
const Card = ({post}:{post:post}) => {
  const date = (time : string) : string =>{
    return new Date(parseInt(time)).toLocaleDateString()
  }
  return (
    <div className=" my-7 flex gap-7 h-[250px] items-center rounded-lg hover:bg-secondary ease-in-out transition-colors duration-500 ">
      <div className=" w-1/2 h-[250px] relative">
        <Image className=" rounded-lg" alt="image" fill src={post.img ? post.img : "/p1.jpeg"} />
      </div>
      <div className="  gap-4 flex flex-col  w-1/2">
        <div>
          <span className=" text-gray-500">{date(post.createdAt)} -</span>
          <span className=" font-bold text-[crismon]">{post.category}</span>
        </div>
        <h1 className=" text-[24px] font-bold max-h-10 truncate  p-1 ">{post.title}</h1>
        <p className=" text-[18px] max-h-20 truncate p-1 font-light text-accent ">
         {post.desc}
        </p>
        <Link
          className=" text-[18px] font-light text-accent p-2 border-b border-[crismon] w-max "
          href={`/blog/${post.id}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;

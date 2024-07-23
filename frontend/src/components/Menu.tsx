import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryList from "./CategoryList";
import {  useQuery } from "@apollo/client";
import { post } from "../schema/type";
import { getAllPosts } from "../schema/query";
import { motion } from "framer-motion";
const Menu = () => {
  const {data, loading, error} = useQuery(getAllPosts,{
    variables:{
      popular:true
    }
  })
  return (
    <div className=" max-lg:hidden  w-1/4">
      <h2 className=" text-gray-400 text-lg font-[400]">{"what's hot"}</h2>
      <h1 className=" text-2xl">Most Popular</h1>
      <div className="flex flex-col gap-3  justify-start my-6">
        {
          data &&
          data.getAllPosts.posts.map((post:post , index : number) => (
            <motion.div 
            initial={{opacity:0.5 , scale : 0.8 , y: -30 }}
            whileInView={{opacity:1 , scale : 1 , y: 0 }}
            viewport={{ once: true, amount: 0.1 }} 
            transition={{ duration: 1 , delay: index * 0.3 , type:'tween' }}>

          <Link href={"/blog/"+post.id} key={post.id}>
          <div className=" mx-auto p-4 rounded-lg hover:bg-secondary transition-colors ease-in-out duration-500 flex flex-col gap-2 flex-nowrap " >
            <div className=" w-full  flex-nowrap flex justify-between gap-2 items-center">
            <h4 className="py-1 text-[13px] w-max bg-accent font-bold text-white rounded-md px-2">{post.category}</h4>
            <div className="  h-12 relative w-12 ">
              <Image
                    alt="image"
                    src={post.img ? post.img : "/p1.jpeg"}
                    fill
                    className="rounded-full object-cover"
                  />
              </div>
            </div>
            <h3 className=" truncate text-2xl font-bold  text-accent">
            {post.title}
            </h3>
            <div className=" text-[12px]">
              <span>{post.userEmail.name.split(' ')[0]}  </span>
              <span className="text-gray-400">{new Date(parseInt(post.createdAt)).toDateString()}</span>
            </div>
          </div>
        </Link>
        </motion.div>
        ))}
      </div>
      <h2 className=" text-gray-400 text-lg my-5 font-[400]">Discover by topic</h2>
      <h1 className=" text-2xl">categories</h1>
      <div className=" grid grid-cols-3  gap-5 mt-5">
        <CategoryList image={false}/>
        </div>
    </div>
  );
};

export default Menu;

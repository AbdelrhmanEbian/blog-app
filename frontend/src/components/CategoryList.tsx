"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { category } from "../schema/type";
const DynamicLoading = dynamic(() => import("./Loading"), { ssr: false });
const CategoryList = ({image , categories , categoriesLoading }:{ categoriesLoading:boolean | undefined ; categories:[category] | undefined ; image:boolean}) => {
  if (categoriesLoading) {
    return <DynamicLoading />;
  }
  return (
    <>
      {categories?.map(
          (category: { title: string; img: string }) => (
            <motion.div
             key={category.title}
            initial={{opacity : 0 , scale:0.6}}
            viewport={{ once: true, amount: 0.2 }} 
            whileHover={{ scale: 1.05 }}
            whileInView={{opacity : 1 , scale : 1}}
            transition={{ duration: .1 , type:'tween' }}
          >
            <Link key={category.title}
              href={"/category/" + category.title}
              aria-label={`Category ${category.title}`}
              className=" p-2 text-md bg-secondary font-bold text-accent flex gap-5 items-center capitalize px-1  justify-center  rounded-lg"
            >

              { image  &&(
                <div className="   h-12 w-12 flex-col items-center justify-between  max-md:w-full flex-1 relative">
                <Image
              sizes="(max-width: 600px) 100vw, 
              (max-width: 1200px) 50vw, 
              33vw"
              loading="lazy"
              className="rounded-lg"
              width={50}
              height={50}
              style={{
                objectFit: "contain",
                width: "fit-content",
                margin: "auto",
                height: "100%",
              }}
              alt={category.img ? category.title : "Default post image"}
              src={category.img ? category.img : "/p1.jpeg"}
            />
                </div>
              )}
              {category.title}
            </Link>
            </motion.div>
          )
        )}
    </>
  );
};

export default CategoryList;

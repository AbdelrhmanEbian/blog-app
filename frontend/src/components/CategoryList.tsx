import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GET_CATEGORIES } from "../schema/query";
import { motion } from "framer-motion";
const CategoryList = ({image}:{image:boolean}) => {

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  return (
    <>
      {data &&
        data.getAllCategories.map(
          (category: { title: string; img: string }) => (
            <motion.div
             key={category.title}
            initial={{opacity : 0 , scale:0.6}}
            viewport={{ once: true, amount: 0.2 }} 
            whileInView={{opacity : 1 , scale : 1}}
            transition={{ duration: .5 , type:'tween' }}
          >
            <Link key={category.title}
              href={"/category/" + category.title}
              className=" p-2 text-md bg-secondary font-bold text-accent flex gap-5 items-center capitalize px-1  justify-center  rounded-lg"
            >

              { image  &&(<Image
                alt="category"
                className=" rounded-full aspect-square h-12 w-12"
                src={category.img ? category.img : "/p1.jpeg"}
                width={50}
                height={50}
              />)}
              {category.title}
            </Link>
            </motion.div>
          )
        )}
    </>
  );
};

export default CategoryList;

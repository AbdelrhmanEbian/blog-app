"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import CategoryList from "./CategoryList";
import { category, post } from "../schema/type";
import Loading from "./Loading";
const Menu = ({
  categories,
  categoriesLoading,
  posts
}: {
  categoriesLoading: boolean | undefined;
  posts:[post] ;
  categories: [category] | undefined;
}) => {
  return (
    <div className="hidden lg:block w-1/4">
      <h2 className="text-gray-400 text-lg font-medium">What is Hot</h2>
      <h1 className="text-2xl font-bold mb-6">Most Popular</h1>
      {posts?.length !< 0 && <Loading />}
      <div className="flex flex-col gap-4">
        {posts?.map((post: post, index: number) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0.5, scale: 0.8, y: -30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: index * 0.15, type: "tween" }}
          >
            <Link href={`/blog/${post.id}`} aria-label={post.title}>
              <div className="p-4 rounded-lg hover:bg-secondary flex transition-colors duration-300  flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="bg-accent text-white font-bold text-xs py-1 px-2 rounded-md">
                    {post.category}
                  </h4>
                  <div className="relative w-12 h-12">
                    <Image
                      src={post.img || "/p1.jpeg"}
                      alt={post.title || "Post Image"}
                      width={50}
                      height={50}
                      className="rounded-full aspect-square object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-accent truncate">
                  {post.title}
                </h3>
                <div className="text-sm text-gray-600">
                  <span>{post.userEmail.name.split(" ")[0]}</span>
                  <span className="ml-1 text-gray-400">
                    {new Date(parseInt(post.createdAt)).toDateString()}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <h2 className="text-gray-400 text-lg my-5 font-medium">
        Discover by Topic
      </h2>
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid max-xl:grid-cols-1 grid-cols-2 gap-5 mt-5">
        <CategoryList
          categoriesLoading={categoriesLoading}
          categories={categories}
          image={false}
        />
      </div>
    </div>
  );
};
export default Menu;

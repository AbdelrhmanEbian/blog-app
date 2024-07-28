"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { post } from "../schema/type";
import { getAllPostsOnly } from "../schema/query";
import { motion } from "framer-motion";
const CardList = ({
  isWritePath,
  postUploaded,
  categoryName,
  userEmail,
}: {
  isWritePath: boolean;
  postUploaded?: boolean;
  userEmail?: string;
  categoryName?: string;
}) => {
  const DynamicCard = dynamic(() => import("./Card"), { ssr: false });
  const DynamicLoading = dynamic(() => import("./Loading"), { ssr: false });
  const [postDeleted, setPostDeleted] = useState<boolean>(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");
  const [inputKey, setInputKey] = useState<number>(0);
  const searchTermRef = useRef<string>("");
  const { data, refetch , loading } = useQuery(getAllPostsOnly, {
    variables: {
      page: 1,
      category: categoryName,
      userEmail: userEmail,
      searchTerm: currentSearchTerm,
    },
  });

  useEffect(() => {
    if (postUploaded || postDeleted) {
      refetch({
        userEmail: userEmail,
        page: 1,
        searchTerm: currentSearchTerm,
      });
    }
  }, [postUploaded, postDeleted, userEmail, currentSearchTerm, refetch]);
  const handleSearch = (reset: boolean) => {
    const term = reset ? "" : searchTermRef.current;
    setCurrentSearchTerm(term);
    if (reset) {
      setInputKey(prevKey => prevKey + 1); // Trigger input re-render
      searchTermRef.current = ""; // Reset the ref value
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="w-3/4 max-lg:w-full">
      <h1 className="font-bold text-3xl">
        {userEmail ? "My Posts" : "Recent Posts"}
      </h1>
      <div className="my-4">
        <input
          key={inputKey}
          type="text"
          defaultValue={searchTermRef.current}
          onChange={(e) => (searchTermRef.current = e.target.value)}
          placeholder="Search by title or description ..."
          className="input mb-4 max-sm:block sm:mr-2 input-bordered bg-secondary text-accent-focus w-[300px]"
        />
        <button
          onClick={() => handleSearch(false)}
          className="btn btn-secondary"
        >
          Search
        </button>
        <button
          onClick={() => handleSearch(true)}
          className="btn btn-neutral ml-2"
        >
          Reset
        </button>
      </div>
      <div className="my-7 pb-10 min-h-[300px] w-full relative mb-10">
        {!loading ? 
          (data.getAllPosts.posts.length !== 0 ?
             (data.getAllPosts.posts.map((post: post, index: number) => (
            <motion.div
              key={post.id}
              initial="hidden"
              whileInView={"visible"}
              exit={"exit"}
              variants={cardVariants}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                damping: 10,
                stiffness: 100,
                type: "spring",
              }}
            >
              <DynamicCard
                searchTerm={currentSearchTerm}
                isWritePath={isWritePath}
                setPostDeleted={setPostDeleted}
                post={post}
              />
            </motion.div>
          ))):
        (
          <div>
            <p className=" text-neutral font-medium ">{`sorry there are not any result ${ currentSearchTerm.length !== 0 && "with search " + currentSearchTerm})`}</p>
          </div>
        )
      )
   : (
          <div className="flex-[5]">
            <DynamicLoading />
          </div>
        )}
        {data && (
          <div className="join absolute mt-3 -bottom-4 justify-center w-full">
            <button
              aria-label="previous page"
              onClick={() => {
                if (data.getAllPosts.currentPage > 1) {
                  refetch({
                    page: data.getAllPosts.currentPage - 1,
                    category: categoryName,
                    searchTerm: currentSearchTerm,
                  });
                }
              }}
              className={`${
                data.getAllPosts.currentPage === 1 && "btn-disabled"
              } join-item btn`}
            >
              «
            </button>
            <button
              aria-label="current page"
              className="join-item btn btn-secondary"
            >
              {data.getAllPosts.currentPage}
            </button>
            <button
              aria-label="following page"
              onClick={() => {
                if (
                  data.getAllPosts.currentPage < data.getAllPosts.numberOfPages
                ) {
                  refetch({
                    page: data.getAllPosts.currentPage + 1,
                    category: categoryName,
                    searchTerm: currentSearchTerm,
                  });
                }
              }}
              className={`${
                data.getAllPosts.currentPage ===
                  data.getAllPosts.numberOfPages && "btn-disabled"
              } join-item btn`}
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;

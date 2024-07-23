import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import { post } from '../schema/type';
import { getAllPostsOnly } from "../schema/query";
import { motion } from "framer-motion";

const CardList = ({
  category,
  isWritePath,
  postUploaded,
  categoryName,
  userEmail,
}: {
  category?: boolean;
  isWritePath: boolean;
  postUploaded?: boolean;
  userEmail?: string;
  categoryName?: string;
}) => {
  const DynamicCard = dynamic(() => import("./Card"), { ssr: false });
  const [postDeleted, setPostDeleted] = useState<boolean>(false);
  const { data, loading, error, refetch } = useQuery(getAllPostsOnly, {
    variables: {
      page: 1,
      category: categoryName,
      userEmail: userEmail,
    },
  });

  useEffect(() => {
    if (postUploaded || postDeleted) {
      refetch({
        userEmail: userEmail,
        page: 1,
      });
    }
  }, [postUploaded, postDeleted, userEmail, refetch]);

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-3/4 max-lg:w-full">
      <h1 className="font-bold text-3xl">{userEmail ? "My Posts" : "Recent Posts"}</h1>
      <div className="my-7 pb-10 min-h-[300px] w-full relative mb-10">
        {loading && <Loading />}
        {data?.getAllPosts?.posts?.length ? (
          data.getAllPosts.posts.map((post: post) => (
            <motion.div
              key={post.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration:0.5 }}
            >
              <DynamicCard isWritePath={isWritePath} setPostDeleted={setPostDeleted} post={post} />
            </motion.div>
          ))
        ) : (
          !loading && <div className="flex-[5]"><Loading /></div>
        )}
        {data && (
          <div className="join absolute mt-3 -bottom-4 justify-center w-full">
            <button
              onClick={() => {
                if (data.getAllPosts.currentPage > 1) {
                  refetch({
                    page: data.getAllPosts.currentPage - 1,
                    category: categoryName,
                  });
                }
              }}
              className={`${data.getAllPosts.currentPage === 1 && "btn-disabled"} join-item btn`}
            >
              «
            </button>
            <button className="join-item btn btn-secondary">{data.getAllPosts.currentPage}</button>
            <button
              onClick={() => {
                if (data.getAllPosts.currentPage < data.getAllPosts.numberOfPages) {
                  refetch({
                    page: data.getAllPosts.currentPage + 1,
                    category: categoryName,
                  });
                }
              }}
              className={`${data.getAllPosts.currentPage === data.getAllPosts.numberOfPages && "btn-disabled"} join-item btn`}
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

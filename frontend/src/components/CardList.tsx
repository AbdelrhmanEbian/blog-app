import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import {post} from '../schema/type' 
import { getAllPostsOnly } from "../schema/query";
const CardList = ({
  category,
  postUploaded,
  categoryName,
  userEmail,
}: {
  category?: boolean;
  postUploaded?: boolean;
  userEmail?: string;
  categoryName?: string;
}) => {
  const DynamicCard = dynamic(() => import("./Card"), { ssr: false });
  
  const { data, loading, error, refetch } = useQuery(getAllPostsOnly, {
    variables: {
      page: 1,
      category: categoryName,
      userEmail: userEmail,
    },
  });

  useEffect(() => {
    if (postUploaded) {
      refetch({
        userEmail: userEmail,
        page: 1,
      });
    }
  }, [postUploaded, userEmail, refetch]);
  return (
    <div className="w-3/4 max-lg:w-full">
      <h1 className="font-bold text-3xl">{userEmail ? "My Posts" : "Recent Posts"}</h1>
      <div className="my-7 pb-10 min-h-[300px] w-full relative mb-10">
        {data?.getAllPosts?.posts?.length ? (
          data.getAllPosts.posts.map((post: post) => (
            <div key={post.id}>
              <DynamicCard post={post} />
            </div>
          ))
        ) : (
          <div className="flex-[5]"><Loading /></div>
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
              className={`${data.getAllPosts.currentPage === 1 &&  "btn-disabled"} join-item btn`}
            >
              «
            </button>
            <button  className={`join-item btn btn-secondary`}>{data.getAllPosts.currentPage}</button>
            <button
              onClick={() => {
                if (data.getAllPosts.currentPage < data.getAllPosts.numberOfPages) {
                  refetch({
                    page: data.getAllPosts.currentPage + 1,
                    category: categoryName,
                  });
                }
              }}
              className={` ${data.getAllPosts.currentPage === data.getAllPosts.numberOfPages &&  "btn-disabled"}  join-item btn`}
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

import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import {post} from '../schema/type' 
const CardList = ({
  category,
  categoryName,
}: {
  category?: boolean;
  categoryName?: string;
}) => {
  const DynamicCard = dynamic(() => import("./Card"), { ssr: false });
  const getAllPosts = gql`
    query GetAllPosts($category: String, $page: Int!) {
      getAllPosts(category: $category, page: $page) {
        posts{
        id
        title
        desc
        img
        category
        createdAt
      }
      currentPage
      numberOfPages
      }
    }
  `;
  const { data, loading, error, refetch  } = useQuery(getAllPosts, {
    variables: {
      page:1, 
      category: categoryName,
    },
  });
  if (loading) {
    return <div className="flex-[5]"><Loading/></div>
  }
  return (
    <div className="  w-3/4  max-lg:w-full">
      <h1 className="font-bold text-3xl">Recent Posts</h1>
      <div className="my-7 pb-10 min-h-[300px] w-full relative mb-10">
        {data.getAllPosts.posts ?
          data.getAllPosts.posts.map((post: post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <DynamicCard post={post} key={post.id} />
            </Link>
          ))
            :
            (
              <div className=" flex-[5]">
                <Loading/>
              </div>
            )
          }
        {data && (
          <div className="join absolute bottom-0 justify-center w-full">
            <button
              onClick={() => {
                if (data.getAllPosts.currentPage === 1) {
                  return
                }else{

                  refetch({
                    page: data.getAllPosts.currentPage - 1,
                    category: categoryName,
                  });
                }
              }}
              className="join-item btn"
            >
              «
            </button>
            <button className="join-item btn btn-secondary">{data.getAllPosts.currentPage}</button>
            <button
              onClick={() => {
                if (data.getAllPosts.currentPage === data.getAllPosts.numberOfPages) {
                  return
                }else{
                  refetch({
                    page: data.getAllPosts.currentPage + 1,
                    category: categoryName,
                  });
                }
              }}
              className="join-item btn"
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

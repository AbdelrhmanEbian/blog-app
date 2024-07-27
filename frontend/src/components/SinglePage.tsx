import Image from "next/image";
import React from "react";
import Loading from "./Loading";
import { GET_CATEGORIES, getAllPosts, getPost } from "../schema/query";
import dynamic from "next/dynamic";
import { client } from "./apolloInitialize";
const DynamicComments = dynamic(() => import("./Comments"), { ssr: false });
const DynamicMenu = dynamic(() => import("./Menu"), { ssr: false });
const SinglePage = async ({ params }: { params: { id: string } }) => {
  const { props } = await getData(params);
  return (
    <div>
      {props ? (
        <div>
          <div className=" flex max-md:flex-col-reverse items-center gap-16">
            <div className="flex-1 md:w-1/2 max-md:min-h-[100px] min-h-[350px] justify-between py-3 flex flex-col">
              <div className="">
                <h1 className="text-[40px] max-h-full max-md:text-[30px]  break-words mb-[16px]">
                  {props?.post.title}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 relative w-10">
                  <Image
                    sizes="(max-width: 600px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw"
                    loading="lazy"
                    className="rounded-lg"
                    width={40}
                    height={40}
                    style={{
                      objectFit: "contain",
                      width: "fit-content",
                      margin: "auto",
                      height: "100%",
                    }}
                    alt={
                      props?.post.img ? props?.post.title : "Default post image"
                    }
                    src={props?.post.img ? props?.post.img : "/p1.jpeg"}
                  />
                </div>
                <div className=" flex flex-col gap-1 text-accent">
                  <span className=" text-[24px]">
                    {props?.post.userEmail.name}{" "}
                  </span>
                  <span>
                    {new Date(
                      parseInt(props?.post.createdAt)
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className=" max-md:min-h-[175px]  max-md:w-full flex-1 min-h-[350px] relative">
              <Image
                sizes="(max-width: 600px) 100vw, 
                (max-width: 1200px) 50vw, 
                33vw"
                loading="eager"
                fill
                src={props?.post.img ? props?.post.img : "/p1.jpeg"}
                className=" rounded-lg "
                alt="image"
              />
            </div>
          </div>
          <div className=" flex gap-16 mt-16">
            <div className=" max-md:w-full  w-3/4  ">
              <div className=" max-md:text-[18px] text-[24px]  break-words font-light">
                <p>{props?.post.desc}</p>
              </div>
              <DynamicComments postId={props?.post.id} />
            </div>
            <DynamicMenu
              posts={props?.posts}
              categories={props?.categories}
              categoriesLoading={props?.categoriesLoading}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default SinglePage;
export async function getData({ id }: { id: string }) {
  try {
    const { data: post } = await client.query({
      query: getPost,
      variables: {
        id,
      },
    });
    const { data: posts } = await client.query({
      query: getAllPosts,
      variables: { popular: true },
    });
    const { data: categories, loading: categoriesLoading } = await client.query(
      { query: GET_CATEGORIES }
    );
    return {
      props: {
        post: post.getPost,
        posts: posts.getAllPosts.posts,
        categories: categories.getAllCategories,
        categoriesLoading,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      post: null,
    };
  }
}

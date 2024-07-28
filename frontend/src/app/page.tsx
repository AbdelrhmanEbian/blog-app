import React from "react";
import Featured from "../components/Featured";
import CategoryList from "../components/CategoryList";
import { GET_CATEGORIES, getAllPosts, getPostOnly } from "../schema/query";
import ApolloWrapper from "../components/ApolloClient";
import dynamic from "next/dynamic";
import Loading from "../components/Loading";
import { client } from "../components/apolloInitialize";
const DynamicCardList = dynamic(() => import("../components/CardList"), {
  ssr: false,
});
const DynamicMenu = dynamic(() => import("../components/Menu"), { ssr: false });
const Page = async () => {
  const { props } = await getData();
  return (
    <div>
      <Featured post={props?.post} />
      {props?.categoriesLoading === false && (
        <>
          <h1 className=" font-bold text-3xl my-[50px]">popular categories</h1>
          <div className=" grid   sm:grid-cols-3 lg:grid-cols-5 grid-cols-1 2xl:grid-cols-6 items-center justify-between gap-5">
            {!props?.categoriesLoading? (
              <CategoryList
                categoriesLoading={props?.categoriesLoading}
                categories={props?.categories}
                image={true}
              />
            ) : (
              <Loading />
            )}
          </div>
        </>
      )}
      <div className="mt-10 flex gap-10">
        <ApolloWrapper>
          <DynamicCardList isWritePath={false} />
          <DynamicMenu
            posts={props?.posts}
            categoriesLoading={props?.categoriesLoading}
            categories={props?.categories}
          />
        </ApolloWrapper>
      </div>
    </div>
  );
};
export default Page;
export async function getData() {
  try {
    const { data: post } = await client.query({
      query: getPostOnly,
      variables: { popular: true },
      context: {
        fetchOptions: {
          next: { revalidate: 60 * 60 * 24 },
        },
      },
    });
    const { data: posts } = await client.query({
      query: getAllPosts,
      variables: { popular: true },
    });
    const { data: categories, loading: categoriesLoading } = await client.query(
      {
        query: GET_CATEGORIES,
        context: {
          fetchOptions: {
            next: { revalidate: 60 * 60 * 24 },
          },
        },
      }
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
    return {
      post: null,
      categories: [],
      categoriesLoading: false,
    };
  }
}

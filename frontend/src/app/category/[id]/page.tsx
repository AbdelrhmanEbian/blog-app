import React from "react";
import Menu from "../../../components/Menu";
import ApolloWrapper from "../../../components/ApolloClient";
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include', // Ensure credentials are included
  }),
  cache: new InMemoryCache(),
});
import { GET_CATEGORIES, getAllPosts } from "../../../schema/query";
import dynamic from "next/dynamic";
const DynamicCardList = dynamic(() => import("../../../components/CardList"), { ssr: true });
const Page = async ({ params }:{ params: { id: string } }) => {
  const { props } = await getData();
  return (
    <div>
      <h1 className=" mb-7 text-3xl text-white text-center px-1 bg-[coral] py-3">
        {params.id}
      </h1>
      <div className=" flex gap-12">
        <ApolloWrapper>
          <DynamicCardList isWritePath={false} categoryName={params.id} />
        </ApolloWrapper>
        <Menu
          posts={props?.posts}
          categoriesLoading={props?.categoriesLoading}
          categories={props?.categories}
        />
      </div>
    </div>
  );
};
export default Page;
export async function getData() {
  try {
    const { data: posts } = await client.query({
      query: getAllPosts,
      variables: { popular: true },
    });
    const { data: categories, loading: categoriesLoading } = await client.query(
      { query: GET_CATEGORIES }
    );
    return {
      props: {
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
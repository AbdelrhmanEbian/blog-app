"use client";
import React from "react";
import Featured from "../components/Featured";
import CategoryList from "../components/CategoryList";
import CardList from "../components/CardList";
import Menu from "../components/Menu";
import ApolloWrapper from "../components/ApolloClient";
export default function Home() {
  return (
    <div>
      <ApolloWrapper>
      <Featured />
      <h1 className=' font-bold text-3xl my-[50px]'>popular categories</h1>
      <div className=' grid   sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 2xl:grid-cols-6 items-center justify-between gap-5'>
        <CategoryList image={true} />
        </div>
        <div className="mt-10 flex gap-10">
          <CardList isWritePath={false}/>
          <Menu />
        </div>
      </ApolloWrapper>
    </div>
  );
}

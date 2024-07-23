import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import Comments from "./Comments";
import Menu from "./Menu";
import Loading from "./Loading";
import { getPost } from "../schema/query";
const SinglePage = ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = useQuery(getPost, {
    variables: {
      id: params.id,
    },
  });

  // addView()
  // handleAddView()
  return (
    <div>
      {data ? (
        <div>
          <div className=" flex items-center gap-16">
            <div className="flex-1 md:w-1/2 min-h-[350px] justify-between py-3 flex flex-col">
              <div className="">
                <h1 className="text-[40px] max-h-full max-md:text-[30px]  break-words mb-[16px]">
                  {data.getPost.title}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 relative w-10">
                  <Image
                    alt="image"
                    src={data.getPost.userEmail.image}
                    fill
                    className="   rounded-full object-cover"
                  />
                </div>
                <div className=" flex flex-col gap-1 text-accent">
                  <span className=" text-[24px]">
                    {data.getPost.userEmail.name}{" "}
                  </span>
                  <span>
                    {new Date(
                      parseInt(data.getPost.createdAt)
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className=" max-md:hidden flex-1 min-h-[350px] relative">
              <Image
                fill
                src={data.getPost.img ? data.getPost.img : "/p1.jpeg"}
                className=" rounded-lg "
                alt="image"
              />
            </div>
          </div>
          <div className=" flex gap-16 mt-16">
            <div className="   w-3/4  ">
              <div className=" max-md:text-[18px] text-[24px]  break-words font-light">
                <p>{data.getPost.desc}</p>
              </div>
              <Comments postId={data.getPost.id} />
            </div>
            <Menu />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SinglePage;

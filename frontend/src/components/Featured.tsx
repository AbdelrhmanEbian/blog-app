import Image from "next/image";
import Link from "next/link";
import React from "react";
import { post } from "../schema/type";
const Featured = ({ post }: { post: post | null }) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-[500]">
        <span className="font-bold text-4xl md:text-5xl">Hey , There!</span> Discover new stories
        and creative ideas.
      </h1>
      <div className="text-[60px] my-7 flex max-md:gap-2 max-md:flex-col gap-7 md:h-[350px] items-center rounded-lg ">
        <div className="w-full md:w-1/2 h-[350px] relative">
          <Image
            sizes="(max-width: 600px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw"
            loading="lazy"
            className="rounded-lg"
            width={200}
            height={250}
            style={{
              objectFit: "contain",
              width: "fit-content",
              margin: "auto",
              height: "100%",
            }}
            alt={post?.img ? post?.title : "Default post image"}
            src={post?.img ? post?.img : "/p1.jpeg"}
          />
        </div>
        <div className="gap-5 max-w-full flex max-md:mt-[20px] md:min-h-[300px] justify-evenly flex-col flex-1">
          <div className="py-1">
            <h2 className="md:text-[30px] break-words text-3xl font-semibold">
              {post?.title}
            </h2>
          </div>
          <p className="text-xl break-words md:text-[20px] font-light text-accent">
            {post?.desc}
          </p>
          <Link
            className=" btn-neutral w-max btn "
            aria-label={"our popular post is about" + post?.title}
            href={`blog/${post?.id}`}
          >
            Explore Post
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Featured;

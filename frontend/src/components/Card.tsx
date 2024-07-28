"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMutation } from "@apollo/client";
import { post } from "../schema/type";
import { deletePost } from "../schema/mutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
const Card = ({
  post,
  setPostDeleted,
  isWritePath,
  searchTerm,
}: {
  post: post;
  searchTerm: string;
  isWritePath: boolean;
  setPostDeleted: (deletedPost: boolean) => void;
}) => {
  const date = (time: string): string => {
    return new Date(parseInt(time)).toLocaleDateString();
  };
  const [deletePostMutation] = useMutation(deletePost);
  const { user } = useAuth();
  const router = useRouter();
  const handleDelete = async () => {
    if (user?.email !== post.userEmail?.email) {
      toast.error("this is not your own post");
      router.push("/");
    }
    try {
      const { data } = await deletePostMutation({
        variables: {
          id: post.id,
        },
      });
      setPostDeleted(true);
      toast.info("Post deleted successfully");
      // Handle any additional logic after the post is deleted
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const highlightText = (text: string, highlight: string) => {
    if (!highlight?.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part: string, index: number) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-slate-300 rounded-lg">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  return (
    <div className="my-7  max-md:border-b-2 pb-1 border-secondary-focus flex max-md:gap-2 max-sm:flex-col gap-7 md:h-[250px] items-center rounded-lg hover:bg-secondary transition-colors duration-500 ease-in-out">
      <div className="w-full md:w-1/2 h-[250px] relative">
        <Image
          sizes="(max-width: 600px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw"
          loading="lazy"
          className="rounded-lg"
          width={100}
          height={250}
          style={{
            objectFit: "contain",
            width: "fit-content",
            margin: "auto",
            height: "100%",
          }}
          alt={post.img ? post.title : "Default post image"}
          src={post.img ? post.img : "/p1.jpeg"}
        />
      </div>
      <div className="gap-4 max-md:gap-1 max-md:w-full flex flex-col md:w-1/2">
        <div>
          <span className="text-gray-500">{date(post.createdAt)} - </span>
          <span className="font-bold text-crimson">{post.category}</span>
        </div>
        <h1 className="text-2xl font-bold  truncate p-1">
          {highlightText(post.title, searchTerm)}
        </h1>
        <p className="text-lg truncate p-1 font-light text-accent">
          {highlightText(post.desc, searchTerm)}
        </p>
        <div className="flex flex-row justify-between">
          <Link
            className="hover:text-xl hover:font-semibold transition-all duration-300 ease-in text-lg font-light text-accent p-2 md:border-b border-crimson"
            href={`/blog/${post.id}`}
            aria-label={`Read more about ${post.title}`}
          >
            Explore Post
          </Link>
          {isWritePath && (
            <>
              <Link
                className="hover:text-xl hover:font-semibold transition-all duration-300 ease-in text-lg font-light text-accent p-2 md:border-b border-crimson"
                href={`/write/${post.id}`}
                aria-label={`Read more about the blog post titled ${post.title}`}
              >
                Update Post
              </Link>
              <button
                onClick={handleDelete}
                className="hover:text-xl hover:font-semibold transition-all duration-300 ease-in text-lg font-light text-accent p-2 md:border-b border-crimson"
                aria-label={`Delete post ${post.title}`}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

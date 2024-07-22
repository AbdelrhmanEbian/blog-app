"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import UploadImage from "./UploadImage";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { createPostOnly } from "../schema/mutation";
import { GET_CATEGORIESOnly, getAllPosts, getMyPosts } from "../schema/query";
import { post } from "../schema/type";
import { useAuth } from "./AuthContext";
import CardList from "./CardList";
export type image = {
  fileName: string;
  publicId: string;
  secureUrl: string;
};

const Write = () => {
  const { user, isAuthenticated } = useAuth();
  const [Uploaded, setUploaded] = useState<boolean>(false);
  const [Image, setImage] = useState<null | image>(null);
  const [category, setCategory] = useState<undefined | string>(undefined);
  const [categories, setCategories] = useState<null | []>(null);
  const [desc, setDesc] = useState<null | string>(null);
  const [Error, setError] = useState<null | string>(null);
  const [title, setTitle] = useState<null | string>(null);
  const [postCreated, setPostCraeted] = useState<boolean>(false);
  const [createPost] = useMutation(createPostOnly);
  const { data: session } = useSession();
  const myPostsSectionRef = useRef<HTMLDivElement>(null);
  const handleSumit = async (user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }) => {
    if (!title || !desc || !category || !Image) {
      setError("please fill all fields");
      return;
    }
    setError("");
    const { data } = await createPost({
      variables: {
        title: title,
        img: Image?.secureUrl,
        category: category,
        userEmail: user.email,
        desc: desc,
      },
    });
    setTitle(null)
    setDesc(null)
    setCategory(undefined)
    setImage(null)
    setPostCraeted(true)
    setUploaded(false)
    if (myPostsSectionRef.current) {
      myPostsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const {
    data,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIESOnly);
  useEffect(() => {
    if (data?.getAllCategories) {
      setCategories(data?.getAllCategories);
    }
  }, [data , postCreated]);
  return (
    <div>
      <h1 className=" font-bold text-4xl mb-5">Write a Blog</h1>
      <input
        onChange={(e) => setTitle(e.target.value as string)}
        value={title ?? ''}  // Set value to empty string if title is null
        type="text"
        className="p-5 rounded-md text-[54px]  bg-transparent outline-none   placeholder:text-[#b3b3b1] border-secondary  border-4 w-full lg:w-1/2  border-spacing-1 "
        placeholder="Title"
      />

      <div className=" relative flex gap-5  ">
        <textarea
  value={desc ?? ''}  // Set value to empty string if title is null
  onChange={(e) => setDesc(e.target.value as string)}
          className=" mt-5 rounded-md border-secondary  border-4   bg-transparent outline-none  placeholder:text-[#b3b3b1] p-5 w-full text-[30px]"
          placeholder="description"
        />
      </div>
      <UploadImage uploadedPost={postCreated} setImage={setImage} />
      <select
  // Use the selected value from the state
        onChange={(e) => setCategory(e.target.value)} // Call the handler function when the select input changes
        className=" mt-5 rounded-md select-bordered border-secondary bg-secondary p-5 w-full lg:w-1/2"
      >
        <option disabled selected={category ? false : true}>
          Select a category
        </option>
        {categories &&
          categories?.length > 0 &&
          categories.map((oneCategory: { title: string }) => (
            <option key={oneCategory.title}>{oneCategory.title}</option>
          ))}
      </select>
      <br />
      <button
         onClick={() => {
          if (session?.user) {
            handleSumit({
              name: session.user.name || undefined,
              email: session.user.email || undefined,
              image: session.user.image || undefined,
            });
          }
        }}
        className=" btn-md my-10 btn  btn-secondary "
      >
        Publish
      </button>
      {Error && <h3 className=" text-2xl font-semibold text-error">{Error}</h3>}
      {Uploaded && (
        <h3 className="text-2xl my-3 text-accent font-semibold">
          the post is uploaded succefully
        </h3>
      )}
      <div ref={myPostsSectionRef} className="my-5 py-5 ">
        <CardList postUploaded={postCreated} userEmail={user?.email as string}/>
      </div>
    </div>
  );
};

export default Write;

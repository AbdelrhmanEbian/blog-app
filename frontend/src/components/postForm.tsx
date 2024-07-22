import React, { useEffect, useState } from 'react'
import { image } from './Write';
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import UploadImage from './UploadImage';
import { GET_CATEGORIESOnly } from '../schema/query';
type postFormProps = {
    setImage: (image: image) => void | null;
    uploadedPost: boolean | null;
    error:string | null
    updatedPost: string | null
    postId:string|null
    setTitle: (title: string)=> void | null
    setDesc: (desc: string)=> void | null
    title: string| null
    desc : string| null
    category:string| undefined
    postCreated: boolean | null
    setCategory: (category: string)=> void | null
  };
function postForm({setTitle , setCategory , setDesc , updatedPost , error , setImage , postId  , uploadedPost  ,title ,desc ,category ,postCreated} :postFormProps) {
    const { data: session } = useSession();
    const [categories , setCategories] =useState<null | []>(null) 
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
    <>
    <h1 className=" font-bold text-4xl mb-5">{ postId ? "Update aBlog" : "Write a Blog"}</h1>
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
      
      {error && <h3 className=" text-2xl font-semibold text-error">{error}</h3>}
      {uploadedPost && (
        <h3 className="text-2xl my-3 text-accent font-semibold">
          the post is uploaded succefully
        </h3>
      )}{updatedPost && (
        <h3 className="text-2xl my-3 text-accent font-semibold">
          the post is updated succefully
        </h3>
      )}
    </>
  )
}

export default postForm
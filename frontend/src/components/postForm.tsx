import React, { useEffect, useState } from "react";
import { image } from "./Write";
import { useQuery } from "@apollo/client";
import UploadImage from "./UploadImage";
import { GET_CATEGORIESOnly } from "../schema/query";
type PostFormProps = {
  setImage: (image: image) => void | null;
  postId: string | null;
  setTitle: (title: string) => void | null;
  setDesc: (desc: string) => void | null;
  title: string | null;
  desc: string | null;
  category: string | undefined;
  setCategory: (category: string) => void | null;
};
function PostForm({
  setTitle,
  setCategory,
  setDesc,
  setImage,
  postId,
  title,
  desc,
  category,
}: PostFormProps) {
  const [categories, setCategories] = useState<null | Array<{ title: string }>>(
    null
  );
  const {
    data,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIESOnly);
  useEffect(() => {
    if (data?.getAllCategories) {
      setCategories(data?.getAllCategories);
    }
  }, [data]);
  return (
    <>
      <h1 className="font-bold text-4xl mb-5">
        {postId ? "Update a Blog" : "Write a Blog"}
      </h1>
      <input
        onChange={(e) => setTitle(e.target.value as string)}
        value={title ?? ""}
        type="text"
        aria-label="title"
        className="p-5 rounded-md text-[54px] bg-transparent outline-none placeholder:text-[#b3b3b1] border-secondary border-4 w-full lg:w-1/2 border-spacing-1"
        placeholder="Title"
      />
      <div className="relative flex gap-5">
        <textarea
          aria-label="description"
          value={desc ?? ""}
          onChange={(e) => setDesc(e.target.value as string)}
          className="mt-5 rounded-md border-secondary border-4 bg-transparent outline-none placeholder:text-[#b3b3b1] p-5 w-full text-[30px]"
          placeholder="Description"
        />
      </div>
      <UploadImage setImage={setImage} />
      <select
        onChange={(e) => setCategory(e.target.value)}
        aria-label="category"
        className="mt-5 rounded-md select-bordered border-secondary bg-secondary p-5 w-full lg:w-1/2"
      >
        <option disabled selected={category ? false : true}>
          Select a category
        </option>
        {categories &&
          categories.length > 0 &&
          categories.map((oneCategory) => (
            <option key={oneCategory.title}>{oneCategory.title}</option>
          ))}
      </select>
      <br />
    </>
  );
}

export default PostForm;

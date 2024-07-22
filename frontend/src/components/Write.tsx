"use client";
import React, { useState, useEffect, useRef } from "react";
import PostForm from "./postForm";
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
  const [desc, setDesc] = useState<null | string>(null);
  const [Error, setError] = useState<null | string>(null);
  const [title, setTitle] = useState<null | string>(null);
  const [postCreated, setPostCraeted] = useState<boolean>(false);
  const [createPost] = useMutation(createPostOnly);
  const { data: session } = useSession();
  const myPostsSectionRef = useRef<HTMLDivElement>(null);
  const handleSubmit = async (user: {
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
  

  return (
    <div>
   <PostForm
        setTitle={setTitle}
        setCategory={setCategory}
        setDesc={setDesc}
        error={Error}
        postId={null}
        updatedPost={null}
        setImage={setImage}
        uploadedPost={postCreated}
        title={title}
        desc={desc}
        category={category}
        postCreated={postCreated}
      />   
      <button
         onClick={() => {
          if (session?.user) {
            handleSubmit({
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
        <div ref={myPostsSectionRef} className="my-5 py-5 ">
        <CardList  postUploaded={postCreated} userEmail={user?.email as string}/>
      </div>
    </div>
  );
};

export default Write;

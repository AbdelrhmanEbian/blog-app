"use client";
import React, { useState, useEffect } from "react";
import PostForm from "./postForm";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { createPostOnly } from "../schema/mutation";
import { useAuth } from "./AuthContext";
import  { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const DynamicCardList = dynamic(() => import("./CardList"), { ssr: true });
export type image = {
  fileName: string;
  publicId: string;
  secureUrl: string;
};
const Write = () => {
  const { user } = useAuth();
  const [Image, setImage] = useState<null | image>(null);
  const [category, setCategory] = useState<undefined | string>(undefined);
  const [desc, setDesc] = useState<null | string>(null);
  const [title, setTitle] = useState<null | string>(null);
  const [postCreated, setPostCraeted] = useState<boolean>(false);
  const [createPost] = useMutation(createPostOnly);
  const { data: session , status } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (status !== "loading" && !session?.user) {
      router.push('/');
    }
  }, [user, router, session , status]);
  const handleSubmit = async (user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }) => {
    if (!title || !desc || !category || !Image) {
      toast.error("All fields are required");
      return;
    }
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
    toast.success("Post created successfully");
  };
  return (
    <div>
   <PostForm
        setTitle={setTitle}
        setCategory={setCategory}
        setDesc={setDesc}
        postId={null}
        setImage={setImage}
        title={title}
        desc={desc}
        category={category}
      />   
      <button
      aria-label="publish post"
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
        <div className="my-5 py-5 ">
        <DynamicCardList  isWritePath={true} postUploaded={postCreated} userEmail={user?.email as string}/>
      </div>
    </div>
  );
};

export default Write;

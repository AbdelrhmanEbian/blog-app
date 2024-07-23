'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import  PostForm  from './postForm'
import {  useQuery , useMutation } from "@apollo/client";
import { getPost } from '../schema/query';
import { image } from './Write';
import { useSession } from 'next-auth/react';
import { updatePostOnly } from '../schema/mutation';
import { useRouter } from 'next/navigation';

function updatePost({ params }: { params: { id: string } }) {
    const {data:session } = useSession()
    const{ user } = useAuth()
    const {data} = useQuery(getPost , {
        variables:{
            id:params.id
        }
})
const router = useRouter();
const [ reCreatePost] = useMutation(updatePostOnly)
const [Image, setImage] = useState<null | image>(null);
const [category, setCategory] = useState<undefined | string>(undefined);
const [desc, setDesc] = useState<null | string>(null);
const [postId, setPostId] = useState<null | string>(null);
const [Error, setError] = useState<null | string>(null);
const [title, setTitle] = useState<null | string>(null);
const [postUpdated, setPostUpdated] = useState<boolean>(false);
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
    const { data } = await reCreatePost({
      variables: {
        title: title,
        img: Image,
        category: category,
        userEmail: user.email,
        desc: desc,
        id:params.id
      },
    });
    setTitle(data.updatePost.title)
    setDesc(data.updatePost.desc)
    setCategory(data.updatePost.category)
    setImage(data.updatePost.img)
    setPostUpdated(true)
};
useEffect(()=>{
    if(data){
        const { img , title , category , desc , id } = data.getPost
        setImage(img)
        setTitle(title)
        setDesc(desc)
        setCategory(category)
        setPostId(id)
    }
}, [data , user])
useEffect(() => {
  if (user?.email !== params.id) {
    router.push('/');
  }
}, [params.id])

    return (
    <div>
        <PostForm
        setTitle={setTitle}
        uploadedPost={false}
        setCategory={setCategory}
        setDesc={setDesc}
        error={Error}
        postId = {postId}
        setImage={setImage}
        updatedPost={postUpdated}
        title={title}
        desc={desc}
        category={category}
        postCreated={postUpdated}
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
        Update
      </button>
    </div>
  )
}

export default updatePost
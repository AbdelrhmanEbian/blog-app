'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import PostForm from './postForm'
import { useQuery, useMutation } from "@apollo/client";
import { getPost } from '../schema/query';
import { image } from './Write';
import { useSession } from 'next-auth/react';
import { updatePostOnly } from '../schema/mutation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { User } from '../schema/type';
function UpdatePost({ params }: { params: { id: string } }) {
    const { data: session } = useSession();
    const { user } = useAuth();
    const { data } = useQuery(getPost, {
        variables: {
            id: params.id
        }
    });
    const router = useRouter();
    const [reCreatePost] = useMutation(updatePostOnly);
    const [Image, setImage] = useState<null | image>(null);
    const [category, setCategory] = useState<undefined | string>(undefined);
    const [desc, setDesc] = useState<null | string>(null);
    const [postId, setPostId] = useState<null | string>(null);
    const [title, setTitle] = useState<null | string>(null);
    const [userEmail, setUser] = useState<null | User>(null);
    const handleSubmit = async (user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    }) => {
        if (!title || !desc || !category || !Image ) {
            return toast.error('All fields are required');
        }
        if(user?.email !== userEmail?.email){
            toast.error('this is not your own post')
            router.push('/write')
        }
        const { data } = await reCreatePost({
            variables: {
                title: title,
                img: Image,
                category: category,
                userEmail: user.email,
                desc: desc,
                id: params.id
            },
        });
        setTitle(data.updatePost.title);
        setDesc(data.updatePost.desc);
        setCategory(data.updatePost.category);
        setImage(data.updatePost.img);
        toast.success('Post updated successfully');
    };

    useEffect(() => {
        if (data) {
            const { img, title, category, desc, id , userEmail} = data.getPost;
            setImage(img);
            setTitle(title);
            setDesc(desc);
            setCategory(category);
            setPostId(id);
            setUser(userEmail)
        }
    }, [data, user]);
    return (
        <div>
            <PostForm
                setTitle={setTitle}
                setCategory={setCategory}
                setDesc={setDesc}
                postId={postId}
                setImage={setImage}
                title={title}
                desc={desc}
                category={category}
            /> 
            <button
            aria-label='update post'
                onClick={() => {
                    if (session?.user) {
                        handleSubmit({
                            name: session.user.name || undefined,
                            email: session.user.email || undefined,
                            image: session.user.image || undefined,
                        });
                    }
                }}
                className="btn-md my-10 btn btn-secondary"
            >
                Update
            </button>
        </div>
    );
}

export default UpdatePost;

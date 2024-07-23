"use client";
import {  useMutation, useQuery } from "@apollo/client";
import { useSession, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {User} from "../schema/type";
import { GET_COMMENT } from "../schema/query";
import { SEND_COMMENT, addViewMutaion } from "../schema/mutation";
import { motion, useInView } from "framer-motion";

const Comments = ({ postId }: { postId: string }) => {
  const { user } = useAuth();
  const [Comment, setComment] = useState<undefined | string>(undefined);
  const [Loading, setLoading] = useState<boolean>(true);
  const { data: session, status: sessionStatus } = useSession();
  
  const [Providers, setProviders] = useState<any>(null);
  const { data, loading, error } = useQuery(GET_COMMENT, {
    variables: {
      postId: postId,
    },
  });
  const [addView] = useMutation(addViewMutaion, {
    variables: {
      id: postId,
    },
  });
  const commentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit:{opacity:0 , x: -50 }
  };
  useEffect(() => {
    const getAllProviders = async () => {
      const result: any = await getProviders();
      setProviders(result);
    };
    const handleAddView = async () => {
      const { data } = await addView({
        variables: {
          id: postId,
        },
      });
    };
    getAllProviders();
    handleAddView();
  }, [session?.user?.email, addView, postId]);
  const [sendComment] = useMutation(SEND_COMMENT);
  const handleSend = async (user:User) => {
    try {
      const { data } = await sendComment({
        variables: {
          comment: Comment,
          user: user.email,
          post: postId,
        },
        refetchQueries: [GET_COMMENT],
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className=" text-accent mt-8 mb-4 text-3xl ">Comments</h1>
      {user ? (
        <div className=" flex items-center  justify-between gap-7">
          <textarea
            value={Comment}
            onChange={(e) => setComment(e.target.value as string)}
            className="p-5 w-full border-secondary bg-secondary rounded-lg text-xl  outline-none border-b-4"
            placeholder="write a comment ..."
          />
          <button
            onClick={() => handleSend(user)}
            className=" btn-neutral btn btn-md"
          >
            Send
          </button>
        </div>
      ) : (
        <>
          {Providers &&
            Object.values(Providers).map((provider: any) => (
              <button
                type="button"
                onClick={() => {
                  signIn(provider.id);
                }}
                key={provider.name}
                className=" btn btn-secondary "
              >
                Sign In With Google
              </button>
            ))}
        </>
      )}
      {data &&
        data.getAllComments.map(
          (oneComment: {
            desc: string;
            userEmail: { name: string; image: string };
            createdAt: string;
          } , index : number) => (
            <motion.div 
            initial="hidden"
            whileInView={"visible"}
            exit={"exit"}
            variants={commentVariants}
            viewport={{ once: true, amount: 0.1 }} 
            transition={{ duration: 1 , delay: index * 0.2 , damping: 10, stiffness: 100 , type:'spring' }} key={oneComment.userEmail.name} className="mt-[30px]">
              <div className="mb-[20px]">
                <div key={oneComment.userEmail.name} className=" flex items-center gap-2 mb-2">
                  <Image
                    className=" rounded-full object-cover aspect-square"
                    width={50}
                    height={50}
                    src={oneComment.userEmail.image}
                    alt="image"
                  />
                  <div className=" flex gap-1 text-accent flex-col">
                    <span className=" font-medium">
                      {oneComment.userEmail.name}
                    </span>
                    <span className=" text-sm">
                      {new Date(
                        parseInt(oneComment.createdAt)
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="max-md:text-[18px] text-[24px]   break-words font-light">
                  {oneComment.desc}
                </p>
              </div>
            </motion.div>
          )
        )}
    </div>
  );
};

export default Comments;

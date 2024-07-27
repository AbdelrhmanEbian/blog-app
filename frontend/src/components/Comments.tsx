"use client";
import { useMutation, useQuery } from "@apollo/client";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { GET_COMMENT } from "../schema/query";
import { SEND_COMMENT, addViewMutaion } from "../schema/mutation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { comment } from "../schema/type";
const DynamicLoading = dynamic(() => import("./Loading"), { ssr: false });
const Comments = ({ postId  }: { postId: string  }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState<string>("");
  const [providers, setProviders] = useState<any>(null);
  const { data, loading } = useQuery(GET_COMMENT, {
    variables: {
      postId
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
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {
    const getAllProviders = async () => {
      const result: any = await getProviders();
      setProviders(result);
    };

    const handleAddView = async () => {
      await addView();
    };

    getAllProviders();
    handleAddView();
  }, [addView]);

  const [sendComment] = useMutation(SEND_COMMENT);

  const handleSend = async () => {
    try {
      await sendComment({
        variables: {
          comment,
          user: user?.email,
          post: postId,
        },
        refetchQueries: [GET_COMMENT],
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data)
  if (loading) {
    return <DynamicLoading />;
  }
  return (
    <div>
      <h1 className="text-accent mt-8 mb-4 text-3xl">Comments</h1>
      {user ? (
        <div className="flex items-center justify-between gap-7">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-5 w-full border-secondary bg-secondary rounded-lg text-xl outline-none border-b-4"
            placeholder="Write a comment..."
            aria-label="Write a comment"
          />
          <button
            onClick={handleSend}
            className="btn-neutral btn btn-md"
            aria-label="Send comment"
          >
            Send
          </button>
        </div>
      ) : (
        providers &&
        Object.values(providers).map((provider: any) => (
          <button
            type="button"
            onClick={() => signIn(provider.id)}
            key={provider.name}
            className="btn btn-secondary"
            aria-label={`Sign in with ${provider.name}`}
          >
            Sign In With {provider.name} to write a comment
          </button>
        ))
      )}
      {data.getAllComments.length  > 0  &&
        data.getAllComments.map(
          (
            oneComment: comment,
            index: number
          ) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              variants={commentVariants}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                damping: 10,
                stiffness: 100,
                type: "spring",
              }}
              key={oneComment.userEmail.name + index}
              className="mt-[30px]"
            >
              <div className="mb-[20px]">
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    loading="eager"
                    className="rounded-full object-cover aspect-square"
                    width={50}
                    height={50}
                    src={oneComment.userEmail.image}
                    alt={`${oneComment.userEmail.name}'s profile picture`}
                  />
                  <div className="flex gap-1 text-accent flex-col">
                    <span className="font-medium">{oneComment.userEmail.name}</span>
                    <span className="text-sm">
                      {new Date(parseInt(oneComment.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="max-md:text-[18px] text-[24px] break-words font-light">
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

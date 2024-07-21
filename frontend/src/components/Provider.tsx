"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
type props = {
  children: React.ReactNode;
};
const Provider = ({ children }: props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

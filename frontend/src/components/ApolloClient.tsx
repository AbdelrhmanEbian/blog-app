'use client'
import React from "react";
import { client } from "./apolloInitialize";
import { ApolloProvider } from "@apollo/client";
const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloWrapper

'use client'
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache , HttpLink} from "@apollo/client";
// Replace with your GraphQL endpoint
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'blog-app-production-4691.up.railway.app/graphql',
  }),
  cache: new InMemoryCache(),
});
const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloWrapper

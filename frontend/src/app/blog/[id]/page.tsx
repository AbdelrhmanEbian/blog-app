import React from "react";
import ApolloWrapper from '../../../components/ApolloClient'
import SinglePage from "../../../components/SinglePage";
const Page = async({ params }: { params: { id: string } }) => {
  return (
    <ApolloWrapper>
      <SinglePage  params={params} />
    </ApolloWrapper>
  );
};
export default Page;
'use client'
import React from 'react'
import UpdatePost from '../../../components/updatePost'
import ApolloWrapper from '../../../components/ApolloClient'
const Page = ({ params }: { params: { id: string } }) => {
  return (
    <ApolloWrapper >
    <UpdatePost params={params}/>
    </ApolloWrapper>
  )
}

export default Page
'use client'
import React from 'react'
import Write from '../../components/Write'
import ApolloWrapper from '../../components/ApolloClient'
const Page = () => {
  return (
    <ApolloWrapper >
    <Write/>
    </ApolloWrapper>
  )
}

export default Page
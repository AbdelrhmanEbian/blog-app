'use client'
import React from 'react'
import CardList from '../../../components/CardList'
import Menu from '../../../components/Menu'
import ApolloWrapper from '../../../components/ApolloClient'
const Page = ({params} : {params:{id:string}}) => {
  return (
    <div>
      <ApolloWrapper>
        <h1 className=' mb-7 text-3xl text-white text-center px-1 bg-[coral] py-3'>{params.id}</h1>
        <div className=' flex gap-12'>
            <CardList isWritePath={false}  category={true} categoryName={params.id}/>
            <Menu/>
        </div>
    </ApolloWrapper>

    </div>
  )
}

export default Page
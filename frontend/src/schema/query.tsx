import {gql} from "@apollo/client";
export const getPost = gql`
query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    desc
    img
    category
    userEmail {
      image
      name
    }
    createdAt
  }
}
`;
export const getAllPosts = gql`
  query GetAllPosts($popular:Boolean){
    getAllPosts(popular:$popular){
      posts{id
      title
      category
      createdAt
      userEmail{
      name
      }}
    }
  }`
  export   const GET_CATEGORIES = gql`
  query GetCategories {
    getAllCategories {
      title
      img
    }
  }
`;
export const GET_COMMENT = gql`
query getComment($postId: ID!) {
  getAllComments(postId: $postId) {
    desc
    userId {
      image
      name
    }
    createdAt
  }
}
`;
export const getPostOnly = gql`
    query GetPost($popular: Boolean!) {
      getPost(popular: $popular) {
        id
        title
        desc
        img
      }
    }
  `;
 export  const GET_CATEGORIESOnly = gql`
   query GetCategories {
     getAllCategories {
       title
     }
   }
 `;
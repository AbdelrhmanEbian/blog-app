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
      id
      name
      email
    }
    createdAt
  }
}
`;
export const getAllPostsOnly = gql`
    query GetAllPosts($category: String,$userEmail:String,  $page: Int! , $searchTerm: String) {
      getAllPosts(category: $category, page: $page , userEmail:$userEmail , searchTerm: $searchTerm) {
        posts{
        id
        title
        desc
        img
        category
        createdAt
        userEmail{
        email
        }
      }
      currentPage
      numberOfPages
      searchTerm
      }
    }
  `;
export const getAllPosts = gql`
  query GetAllPosts($popular:Boolean){
    getAllPosts(popular:$popular){
      posts{id
      title
      category
      img
      createdAt
      userEmail{
      id
      name
      }}
    }
  }`
  export const getMyPosts = gql`
  query GetAllPosts($userEmail:String , $page: Int!){
    getAllPosts(userEmail:$userEmail , page: $page){
      posts{
      id
      title
      category
      img
      createdAt
      }
      currentPage
      numberOfPages
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
query getAllComments($postId: ID!) {
  getAllComments(postId: $postId) {
    desc
    id
    userEmail {
      image
      id
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
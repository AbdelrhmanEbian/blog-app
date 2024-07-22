import {gql} from "@apollo/client";
export const createPostOnly = gql`
    mutation CreatePost(
      $title: String!
      $img: String!
      $userEmail: String!
      $category: String!
      $desc: String!
    ) {
      createPost(
        title: $title
        img: $img
        userEmail: $userEmail
        category: $category
        desc: $desc
      ) {
        title
        id
        desc
        img
        category
        createdAt
        userEmail {
          name
          email
          image
        }
      }
    }
  `;
  export const addViewMutaion = gql`
  mutation addView($id: ID!) {
    addView(postId: $id) {
      id
      views
    }
  }
`;
export const SEND_COMMENT = gql`
mutation sendComment($comment: String!, $user: String!, $post: ID!) {
  addComment(comment: $comment, user: $user, post: $post) {
    desc
  }
}
`;
import { gql } from "@apollo/client";

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: String!, $friendId: String!) {
    addFriend(userId: $userId, friendId: $friendId)
  }
`;
import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $description: String, $userId: String!) {
    createGroup(name: $name, description: $description, userId: $userId) {
      id
      name
      description
    }
  }
`;

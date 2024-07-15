import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
  query GetGroups {
    getGroups {
      id
      name
      description
      createdBy {
        id
        firstName
        lastName
      }
    }
  }
`;
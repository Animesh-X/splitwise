import { gql } from '@apollo/client';

export const GET_GROUP = gql`
  query GetGroup($groupId: String!) {
    getGroup(groupId: $groupId) {
      id
      name
      description
      createdBy {
        id
        firstName
        email
        lastName
      }
      members {
        id
        firstName
        email
        lastName
      }
      expenses {
        id
        title
        description
        createdByUser {
          id
          firstName
          email
          lastName
        }
        transactions {
          amountPaid
          amountOwed
          user {
            id
            email
            firstName
            lastName
          }
        }
      }
      payments {
        amount
        user {
          firstName
          email
          lastName
        }
        oweFrom {
          firstName
          email
          lastName
        }
      }
    }
  }
`;
import { gql } from "@apollo/client";

export const SIGNUP = gql`
    mutation signup($firstName: String!,$lastName: String, $email: String!, $password: String!) {
        createUser(firstName: $firstName,lastName: $lastName, email: $email, password: $password) {
            id,
            email
        }
    }
`
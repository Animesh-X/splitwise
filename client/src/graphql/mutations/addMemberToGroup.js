import { gql } from "@apollo/client";

export const ADD_MEMBER_TO_GROUP = gql`
    mutation AddMemberToGroup($userId: String!, $groupId: String!){
        addMemberToGroup(userId: $userId, groupId: $groupId)
    }
`
const queries = `#graphql
    getUser: User
    getUserByEmail(email: String!): User
    getGroups: [Group]
    getFriends(userId: String!): [User] 
`;

module.exports = { queries };

// getUserToken(email: String!, password: String!): String

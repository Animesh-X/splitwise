const queries = `#graphql
    getUser: User
    getUserByEmail(email: String!): User
    getGroups: [Group]
    getFriends: [User] 
`;

module.exports = { queries };

// getUserToken(email: String!, password: String!): String

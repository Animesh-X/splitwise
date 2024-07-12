const queries = `#graphql
    getUser: User
    getUserByEmail(email: String!): User
    getFriends(userId: String!): [User] 
`;

module.exports = { queries };

// getUserToken(email: String!, password: String!): String

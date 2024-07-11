const queries = `#graphql
    getUser: String
    getUserToken(email: String!, password: String!): String
    getFriends(userId: String!): [User]
`;

module.exports = { queries };

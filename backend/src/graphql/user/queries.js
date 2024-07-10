const queries = `#graphql
    getUser: String
    getUserToken(email: String!, password: String!): String
    getFriends(userId: Int!): [User]
`;

module.exports = { queries };

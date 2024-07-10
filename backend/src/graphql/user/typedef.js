const typeDefs = `#graphql
    type User {
        id: Int!
        firstName: String! 
        lastName: String
        email: String!
        profileImageURL: String
    }
`;

module.exports = { typeDefs };

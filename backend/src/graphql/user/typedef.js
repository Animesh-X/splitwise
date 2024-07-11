const typeDefs = `#graphql
    type User {
        id: String!
        firstName: String! 
        lastName: String
        email: String!
        profileImageURL: String
    }
`;

module.exports = { typeDefs };

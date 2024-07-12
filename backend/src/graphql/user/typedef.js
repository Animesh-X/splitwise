const typeDefs = `#graphql
    type AuthPayload {
        token: String!
        user: User!
    }
    type User {
        id: String!
        firstName: String! 
        lastName: String
        email: String!
        profileImageURL: String
    }
`;

module.exports = { typeDefs };

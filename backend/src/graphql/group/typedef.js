const typeDefs = `#graphql
    type Group {
        id: Int!
        name: String! 
        profileImageURL: String
        description: String
        createdBy: User!
        members: [User]
    }
`;

module.exports = { typeDefs };

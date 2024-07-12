const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, profileImageURL: String): User
    addFriend(userId: String!, friendId: String!): String
    login(email: String!, password: String!): AuthPayload!
`;

module.exports = { 
    mutations
};
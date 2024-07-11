const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, profileImageURL: String): User
    addFriend(userId: String!, friendId: String!): String
`;

module.exports = { 
    mutations
};
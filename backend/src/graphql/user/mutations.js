const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, profileImageURL: String): User
    addFriend(userId: Int!, friendId: Int!): String
`;

module.exports = { 
    mutations
};
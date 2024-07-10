const mutations = `#graphql
    createGroup(name: String!, description: String, imageURL: String, userId: Int!): Group
    addMemberToGroup(userId: Int!, groupId: Int!): String
`;

module.exports = { 
    mutations
};
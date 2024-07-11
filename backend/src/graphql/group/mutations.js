const mutations = `#graphql
    createGroup(name: String!, description: String, imageURL: String, userId: String!): Group
    addMemberToGroup(userId: String!, groupId: String!): String
`;

module.exports = { 
    mutations
};
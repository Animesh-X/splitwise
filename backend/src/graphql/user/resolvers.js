const UserService = require("../../services/user");

const queries =  {
    getUser: () => {
        return "Hello from GraphQL";
    },
    getUserToken: async (_, payload) => {
        const token = await UserService.getUserToken(payload);
        return token;
    },
    getFriends: async(_, payload) => {
        const friends = await UserService.getFriends(payload);
        return friends;
    }
};

const mutations = {
    createUser: async (_, payload) => {
        const newUser = await UserService.createUser(payload);
        return newUser;
    },
    addFriend: async (_, payload) => {
        const result = await UserService.addFriend(payload);
        return result;
    }
};

const resolvers = { queries, mutations};

module.exports = {
    resolvers
};
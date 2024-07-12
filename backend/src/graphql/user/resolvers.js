const UserService = require("../../services/user");
const { throwCustomError, ErrorTypes } = require("../../utils/error");

const queries =  {
    getUser: async (_, parameters, context) => {
        // throw new Error("Not Identified");
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        return context.user;
    },
    // getUserToken: async (_, payload) => {
    //     const token = await UserService.getUserToken(payload);
    //     return token;
    // },
    getUserByEmail: async (_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const user = await UserService.getUserByEmail(payload.email);
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
    },
    login: async (_, payload) => {
        const AuthPayload = await UserService.login(payload);
        return AuthPayload;
    }
};

const resolvers = { queries, mutations};

module.exports = {
    resolvers
};
const UserService = require("../../services/user");
const { throwCustomError, ErrorTypes } = require("../../utils/error");

const queries =  {
    getUser: async (_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        return context.user;
    },
    getUserByEmail: async (_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const user = await UserService.getUserByEmail(payload.email);
        return user;
    },
    getFriends: async(_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const friends = await UserService.getFriends(payload);
        return friends;
    },
    getGroups: async(_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const groups = UserService.getGroupsOfUser(context.user.id);
        return groups;

    }
};

const mutations = {
    createUser: async (_, payload) => {
        const newUser = await UserService.createUser(payload);
        return newUser;
    },
    addFriend: async (_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
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
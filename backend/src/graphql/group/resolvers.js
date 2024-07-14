const GroupService = require("../../services/group");
const { throwCustomError, ErrorTypes } = require("../../utils/error");

const group = {
    createdBy: async (group) => {
        const user = GroupService.getUser(group);
        return user;
    },
    members: async (group) => {
        const members = await GroupService.getUsersByGroupId(group.id);
        return members;
    },
    expenses: async (group) => {
        const expenses = await GroupService.getExpensesByGroupId(group.id);
        return expenses;
    },
    payments: async (group) => {
        const payments = await GroupService.getPaymentsGraphByGroupId(group.id);
        return payments;
    }
};

const queries = {
    getGroup: async(_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const isMember = await GroupService.isUserMemberOfGroup(context.user.id, payload.groupId);
        if (!isMember) {
            throwCustomError(`User is not a member of the group`, ErrorTypes.FORBIDDEN);
        }
        const Group = await GroupService.getGroup(payload);
        console.log(Group);
        return Group;
    }
};

const mutations = {
    createGroup: async(_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const group = await GroupService.createGroup(payload);
        return group;
    },
    addMemberToGroup: async(_, payload, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const result = await GroupService.addMemberToGroup(payload);
        return result;
    }

};

const resolvers = {
    group,
    queries,
    mutations
};

module.exports = { resolvers };
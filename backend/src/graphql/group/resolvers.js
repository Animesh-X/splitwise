const GroupService = require("../../services/group");

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
    getGroup: async(_, payload) => {
        const Group = await GroupService.getGroup(payload);
        return Group;
    }
};

const mutations = {
    createGroup: async(_, payload) => {
        const group = await GroupService.createGroup(payload);
        return group;
    },
    addMemberToGroup: async(_, payload) => {
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
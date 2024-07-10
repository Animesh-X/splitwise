const { ApolloServer } = require("@apollo/server");
const User = require("./user");
const Group = require("./group");
const Expense = require("./expenses");

const createApolloGraphqlServer = async () => {
    const gqlServer = new ApolloServer({
        typeDefs: `
        ${User.typeDefs}
        ${Group.typeDefs}
        ${Expense.typeDefs}
        type Query {
            ${User.queries}
            ${Group.queries}
            ${Expense.queries}
        }
        type Mutation {
            ${User.mutations}
            ${Group.mutations}
            ${Expense.mutations}
        }
        `,
        resolvers: {
            Group: {
                ...Group.resolvers.group,
            },
            Expense: {
                ...Expense.resolvers.expense,
            },
            Query: {
                ...User.resolvers.queries,
                ...Group.resolvers.queries,
                ...Expense.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Group.resolvers.mutations,
                ...Expense.resolvers.mutations,
            }
        }
    });

    await gqlServer.start();

    return gqlServer;
};

module.exports = createApolloGraphqlServer;
const {typeDefs} = require("./typedef");
const {queries} = require("./queries");
const {mutations} = require("./mutations");
const {resolvers} = require("./resolvers");

const Expense = { typeDefs, queries, mutations, resolvers };

module.exports = Expense;
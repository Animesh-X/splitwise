const ExpenseService = require("../../services/expense");

const expense = {
    transactions: async (parent) => {

        const transactions = await ExpenseService.mapUsersToExpense(parent);

        return transactions.map(transaction => ({
            user: transaction.User,
            amountPaid: parseFloat(transaction.amountPaid),
            amountOwed: parseFloat(transaction.amountOwed)
        }));
    }
}

const queries = {
    getExpense: () => {
        return "Expense from graphql"
    }
}

const mutations = {
    createExpense: async (_, {input}, context) => {
        if(!context || !context.user){
            throwCustomError(`Unauthorised`, ErrorTypes.UNAUTHORIZED);
        }
        const expense = await ExpenseService.addExpense(input);
        return expense;
    }
}

const resolvers = {
    expense,
    queries,
    mutations
}

module.exports = { resolvers };
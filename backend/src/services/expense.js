const { Heap } = require("heap-js");
const db = require("../../models");
const logger = require("../utils/logger");
const { ErrorTypes, throwCustomError } = require("../utils/error");

class ExpenseService {
    static async addExpense (payload) {

        const { title, description, groupId, createdBy, transactions } = payload;

        logger.info(`Adding new expense to group - ${groupId}`);

        try {
            const newExpense = await db.Expense.create({
                title,
                description,
                groupId,
                createdBy,
            });
    
    
            for (const transaction of transactions) {
                const { userId, amountPaid, amountOwed } = transaction;
                await db.ExpenseItem.create({
                    userId,
                    amountPaid,
                    amountOwed,
                    expenseId: newExpense.id
                });
            }
    
            const expenseWithTransactions = await db.Expense.findOne({
                where: { id: newExpense.id },
                include: [{
                  model: db.ExpenseItem,
                  as: 'transactions', // Ensure alias matches GraphQL schema
                  include: [db.User]
                }]
            });
    
            logger.info(`Expense Added to group - ${groupId}`);
    
            ExpenseService.#createPaymentGraph(groupId);
    
            return expenseWithTransactions;
        } catch (error) {
            throwCustomError(`Failed to create expense in group - ${groupId}`, ErrorTypes.BAD_REQUEST, error);
        }

        
    }

    static async mapUsersToExpense (expense) {
        const transactions = await db.ExpenseItem.findAll({
            where: { expenseId: expense.id },
            include: [db.User]
        });
        return transactions;
    }

    static async #createPaymentGraph (groupId) {

        logger.info(`Creating Payment graph for group - ${groupId}`);

        try {
            const expenses = await db.Expense.findAll({
                where: {groupId},
                include:[{
                    model: db.ExpenseItem,
                    as: 'transactions',
                }]
            });
        
        // Logging the expense model
        // console.log('Expenses:', expenses);
        // expenses.forEach(expense => {
        //     console.log(`Expense ID: ${expense.id}\n`);
        //     console.log(`Expense Title: ${expense.title}\n`);
        //     console.log(`Expense Description: ${expense.description}\n`);
        //     console.log(`Expense Group ID: ${expense.groupId}\n`);
        //     console.log(`Expense Created By: ${expense.createdBy}\n`);
        //     console.log('Transactions:');
        //     expense.transactions.forEach(transaction => {
        //         console.log(`Transaction User ID: ${transaction.userId}`);
        //         console.log(`Transaction Amount Paid: ${transaction.amountPaid}`);
        //         console.log(`Transaction Amount Owed: ${transaction.amountOwed}`);
        //     });
        // });
    
        const userBalances = new Map();
    
        expenses.forEach(expense => {
            expense.transactions.forEach(transaction => {
                const { userId, amountPaid, amountOwed } = transaction;
                if(!userBalances.has(userId)){
                    userBalances.set(userId, 0);
                }
                const currentBalance = userBalances.get(userId);
                userBalances.set(userId, currentBalance + amountPaid - amountOwed)
            })
        })
        // console.log('User Balances:', userBalances);
    
        const maxHeapComparator = (a, b) => b[1] - a[1];
        const minHeapComparator = (a, b) => a[1] - b[1];
        const isEmpty = (heap) => heap.length === 0;
    
        const positiveAmounts = new Heap(maxHeapComparator);
        const negativeAmounts = new Heap(minHeapComparator);
    
        for (const [userId, balance] of userBalances){
            if(balance > 0) {
                positiveAmounts.push([userId, balance]);
            }
            else {
                negativeAmounts.push([userId, balance]);
            }
        }
    
        const paymentGraph = [];
    
        while(!isEmpty(positiveAmounts) && !isEmpty(negativeAmounts)) {
            const [userId1, balance1] = positiveAmounts.pop();
            const [userId2, balance2] = negativeAmounts.pop();
            const largestPositiveAmount = balance1;
            const largestNegativeAmount = -balance2;
            paymentGraph.push({
                userId1: userId1,
                userId2: userId2,
                amount: Math.min(largestPositiveAmount, largestNegativeAmount)
            });
            const remaining = largestPositiveAmount - largestNegativeAmount;
            if(remaining > 0) {
                positiveAmounts.push([userId1, remaining]);
            }
            else if (remaining < 0) {
                negativeAmounts.push([userId2, remaining]);
            }
        }
    
        paymentGraph.forEach(ele => console.log(ele));
        // console.log(graph);
        await db.PaymentGraph.destroy({
            where: {
                groupId
            }
        })
        paymentGraph.forEach( async (payment) => {
            await db.PaymentGraph.create({
                groupId,
                userId: payment.userId1,
                owesFrom: payment.userId2,
                amount: payment.amount
            });
        });
        } catch (error) {
            throwCustomError(`Error Creating Payment Graph for group - ${groupId}`, ErrorTypes.BAD_REQUEST, error);
        }
        
    }
}

module.exports = ExpenseService;
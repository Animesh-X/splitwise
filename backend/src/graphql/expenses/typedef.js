const typeDefs = `#graphql
    type BalanceMap {
        user: User!,
        amountPaid: Float!,
        amountOwed: Float!
    }
    type Expense {
        id: String!,
        title: String!,
        description: String,
        groupId: String!,
        createdByUser: User!,
        transactions: [BalanceMap]!
    }
    input ExpenseInput {
        title: String!
        description: String
        groupId: String!
        createdBy: String!
        transactions: [BalanceMapInput]!
    }

    input BalanceMapInput {
        userId: String!
        amountPaid: Float!
        amountOwed: Float!
    }
`;

module.exports = { typeDefs };

// Expense Input
// {
//     "input": {
//       "title": "Team Lunch",
//       "description": "Lunch at the local restaurant",
//       "groupId": 1,
//       "createdBy": 5,
//       "transactions": [
//         {
//           "userId": 5,
//           "amountPaid": 20,
//           "amountOwed": 10
//         },
//         {
//           "userId": 19,
//           "amountPaid": 0,
//           "amountOwed": 10
//         }
//       ]
//     }
//   }
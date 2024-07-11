const typeDefs = `#graphql
    type BalanceMap {
        user: User!,
        amountPaid: Float!,
        amountOwed: Float!
    }
    type Expense {
        id: Int!,
        title: String!,
        description: String,
        groupId: Int!,
        createdByUser: User!,
        transactions: [BalanceMap]!
    }
    input ExpenseInput {
        title: String!
        description: String
        groupId: Int!
        createdBy: Int!
        transactions: [BalanceMapInput]!
    }

    input BalanceMapInput {
        userId: Int!
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
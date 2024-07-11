const typeDefs = `#graphql
    type PaymentGraph {
        user: User!
        oweFrom: User!
        amount: Float!
    }
    type Group {
        id: String!
        name: String! 
        profileImageURL: String
        description: String
        createdBy: User!
        members: [User]
        expenses: [Expense]
        payments: [PaymentGraph]
    }
`;

module.exports = { typeDefs };
